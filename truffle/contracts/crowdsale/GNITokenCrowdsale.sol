pragma solidity >=0.4.22 <0.6.0;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import '../project/Project.sol';
import '../token/ERC20/Token.sol';
import '../projectLeader/ProjectLeaderTracker.sol';
import '../voting/Voting.sol';
import '../reimbursements/Reimbursements.sol';
import './Activation.sol';



contract GNITokenCrowdsale is TimedCrowdsale {
  using SafeMath for uint256;
  ProjectLeaderTracker public projectLeaderTracker;
  Activation public activation;
  Voting public voting;
  address  public dividendWallet;

  constructor
      (
        uint256 _openingTime,
        uint256 _doomsDay,
        uint256 _rate,
        address  _developer,
        address  _dividendWallet,
        Token _token,
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
        dividendWallet = _dividendWallet;
        activation = Activation(_activation);
      }

  event ProjectPitch (
    address projectAddress,
    address developer,
    string  title,
    string  lat,
    string  lng,
    uint256 capitalRequired,
    uint256 valuation,
    uint256 developerTokens,
    uint256 investorTokens,
    uint256 totalProjectCount
  );

  mapping(uint256 => address) internal projectAddress;
  uint256 internal totalProjectCount;

  function totalProjectCount_() public view returns (uint256) {
    return totalProjectCount;
  }

  function projectById (uint256 id) public view returns (address ) {
    return projectAddress[id];
  }

  function pitchProject(string memory _title, uint256 capitalRequired, uint256 _valuation, string memory _lat, string memory _lng, bytes32 _voteForHash, bytes32 _voteAgainstHash) public returns (address ) {//should only be callable by developer. may need more tests
   _extendDoomsDay(90);
    return _pitchProject(_title, capitalRequired, _valuation, _lat, _lng, _voteForHash, _voteAgainstHash);
  }

  function _pitchProject(string memory _title, uint256 capitalRequired, uint256 _valuation, string memory _lat, string memory _lng, bytes32 _voteForHash, bytes32 _voteAgainstHash) internal returns (address ) {//should only be callable by developer. may need more tests
    require(msg.sender == developer);//we need a test for this
    Token(token).activatePending(msg.sender);//we need a test for this

   (uint256 developerTokens, uint256 investorTokens) = tokensToMint(_valuation, capitalRequired);

   Token(token).mint(developer, developerTokens);
   Token(token).mint(this, investorTokens);

    address projectAddr = address(new Project(_title, developer, dividendWallet, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng));
    projectLeaderTracker.handleProjectPitch();
    totalProjectCount = totalProjectCount.add(1);
    projectAddress[totalProjectCount] = projectAddr;
    Project(projectAddr).transferOwnership(address(Voting(voting)));
    Project(projectAddr).transferPrimary(address(Activation(activation)));

    emit ProjectPitch(projectAddr, developer, _title, _lat, _lng, capitalRequired, _valuation, developerTokens, investorTokens, totalProjectCount);
    if (capitalRequired == 0) {
      activation.activateProject(projectAddr);
    }
    return projectAddr;
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

/* function getInfo(uint256 id) public view returns(address) {
    /* string, uint256, uint256, uint256, uint256, bool, uint256, uint256, address */
    /* address projectAddr = projectAddrs[id]; */
    /* return ( */
      /* return Project(projectAddr).dividendWallet(); */
      /* Project(projectAddr).name(),
      Project(projectAddr).valuation(),
      Project(projectAddr).capitalRequired(),
      Project(projectAddr).developerTokens(),
      Project(projectAddr).investorTokens(),
      Project(projectAddr).active(),
      Project(projectAddr).totalVotes(),
      /* Project(projectAddr).closingTime(), */
      /* projectAddr */
      /* ); */
    /* }  */
