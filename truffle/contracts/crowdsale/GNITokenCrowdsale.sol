pragma solidity >=0.4.22 <0.6.0;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import '../project/Project.sol';
import '../token/ERC20/Token.sol';
import '../projectLeader/ProjectLeaderTracker.sol';
import '../projectFactory/ProjectFactory.sol';
import '../voting/Voting.sol';
import '../reimbursements/Reimbursements.sol';
import './Activation.sol';



contract GNITokenCrowdsale is TimedCrowdsale {
  using SafeMath for uint256;
  ProjectLeaderTracker public projectLeaderTracker;
  ProjectFactory public projectFactory;
  Activation public activation;
  Voting public voting;
  address public dividendWallet;

  constructor
      (
        uint256 _openingTime,
        uint256 _doomsDay,
        uint256 _rate,
        address  _developer,
        address  _dividendWallet,
        Token _token,
        ProjectFactory _projectFactory,
        ProjectLeaderTracker _projectLeaderTracker,
        address  _reimbursements,
        Voting _voting,
        Activation _activation
      )
      public
      Crowdsale(_rate, _developer, _token)
      TimedCrowdsale(_openingTime, _doomsDay, _reimbursements)
      {
        voting = _voting;
        projectLeaderTracker = ProjectLeaderTracker(_projectLeaderTracker);
        projectFactory = ProjectFactory(_projectFactory);
        dividendWallet = _dividendWallet;
        activation = Activation(_activation);
      }

  function pitchProject(
    string memory _projectInfo,
    uint256 _capitalRequired,
    uint256 _valuation,
    string _cashflow,
    bytes32 _voteForHash,
    bytes32 _voteAgainstHash
    ) public {//should only be callable by developer. may need more tests
   _extendDoomsDay(90);
  _pitchProject(
      _projectInfo,
      _capitalRequired,
      _valuation,
      _cashflow,
      _voteForHash,
      _voteAgainstHash
    );
  }

  function _pitchProject(
      string memory _projectInfo,
      uint256 _capitalRequired,
      uint256 _valuation,
      string _cashFlow,
      bytes32 _voteForHash,
      bytes32 _voteAgainstHash
    ) internal {//should only be callable by developer. may need more tests
    require(msg.sender == developer);//we need a test for this
    Token(token).activatePending(msg.sender);//we need a test for this

   (uint256 developerTokens, uint256 investorTokens) = tokensToMint(_valuation, _capitalRequired);

   Token(token).mint(developer, developerTokens);
   Token(token).mint(this, investorTokens);

   address projectAddr = projectFactory.createProject(
     _projectInfo,
     developer,
     _valuation,
     _capitalRequired,
     developerTokens,
     investorTokens,
     _cashFlow
    );

    projectLeaderTracker.handleProjectPitch();
    Voting(voting).addProject(projectAddr, _voteForHash, _voteAgainstHash);

    if (_capitalRequired == 0) {
      activation.activateProject(projectAddr);
    }
  }

 function tokensToMint (uint256 valuation, uint256 investorValue) private view returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);
   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 //before this, we need to execute any pending token activations with the modifier above for the sender account. We need to do this so that the correct number of tokens are activated
 function buyTokens () public payable { //tests need to be removed/added to account for new functionality. we also may just put all the logic for the super function in here.
   Token(token).activatePending(msg.sender);

   super.buyTokens(msg.sender);
   _extendDoomsDay(90);
  }

  event ProjectActivation (
    address addr,
    uint256 capitalRequired,
    uint256 time
  );


 function transferOnActivation () public { //we need more tests for added functionality
   (
     address  tentativeLeaderAddr,
     bool tentativeLeaderConfirmed
   ) = projectLeaderTracker.tentativeLeader();


   (bool didActivate, uint256 capitalRequired) = activation.tryActivateProject(tentativeLeaderAddr, tentativeLeaderConfirmed, weiRaised);

   if (didActivate) {
     developer.transfer(capitalRequired);
     weiRaised = weiRaised.sub(capitalRequired);
   }
  }



 function reimburseFunds () public {
   require(hasClosed());
   Reimbursements(reimbursements).recordReimbursement.value(weiRaised)();
   weiRaised = 0;
   Token(token).resetInactiveTokenCycle(developer);
   projectLeaderTracker.reset();
 }

 //tests need to be updated

 function extendDoomsDay (uint256 _days) external {
   require(msg.sender == address(Voting(voting)));
   _extendDoomsDay(_days);
 }

 function _extendDoomsDay(uint256 _days) internal canExtendDoomsDay {
    uint256 newDoomsDay = now.add(_days.mul(1728000));
    if (newDoomsDay > doomsDay) {
      doomsDay = newDoomsDay;
      canReOpen = false;
    }
 }

 function reduceDoomsDay (uint256 _days) public canExtendDoomsDay {
   require(msg.sender == address(Voting(voting)));
   doomsDay = doomsDay.sub(_days.mul(1728000));
 }
}
