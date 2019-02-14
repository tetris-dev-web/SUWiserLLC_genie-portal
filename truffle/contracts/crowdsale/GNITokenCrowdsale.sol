pragma solidity >=0.4.22 <0.6.0;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import '../utility/ActivationLocked.sol';
import '../utility/VotingLocked.sol';
import '../utility/ProjectFactoryLocked.sol';
import '../project/Project.sol';
import '../token/InactiveToken.sol';
import '../projectLeader/ProjectLeaderTracker.sol';
import '../voting/Voting.sol';
import '../reimbursements/Reimbursements.sol';
import './Activation.sol';



contract GNITokenCrowdsale is TimedCrowdsale, ActivationLocked, VotingLocked, ProjectFactoryLocked {
  using SafeMath for uint256;
  ProjectLeaderTracker public projectLeaderTracker;
  ProjectFactory public projectFactory;

  constructor
    (
      uint256 _openingTime,
      uint256 _doomsDay,
      uint256 _rate,
      address  _developer,
      InactiveToken _token,
      ProjectLeaderTracker _projectLeaderTracker,
      address _reimbursements
    )
    public
    Crowdsale(_rate, _developer, _token)
    TimedCrowdsale(_openingTime, _doomsDay, _reimbursements)
    {
      projectLeaderTracker = ProjectLeaderTracker(_projectLeaderTracker);
    }

  function mintNewProjectTokensAndExtendDoomsDay (uint256 capitalRequired, uint256 valuation) external onlyProjectFactory returns (uint256, uint256){
    InactiveToken(token).activatePending(developer);
    (uint256 developerTokens, uint256 investorTokens) = tokensToMint(valuation, capitalRequired);

    InactiveToken(token).mint(developer, developerTokens);
    InactiveToken(token).mint(this, investorTokens);

    _extendDoomsDay(90);
    return (developerTokens, investorTokens);
  }

 function tokensToMint (uint256 valuation, uint256 investorValue) private view returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);
   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 //before this, we need to execute any pending token activations with the modifier above for the sender account. We need to do this so that the correct number of tokens are activated
 function buyTokens () public payable { //tests need to be removed/added to account for new functionality. we also may just put all the logic for the super function in here.
   InactiveToken(token).activatePending(msg.sender);

   super.buyTokens(msg.sender);
   _extendDoomsDay(90);
  }

 function transferCapitalToDeveloper (uint256 capitalRequired) public onlyActivation { //we need more tests for added functionality
   developer.transfer(capitalRequired);
   weiRaised = weiRaised.sub(capitalRequired);
  }

 function reimburseFunds () public {
   require(hasClosed());
   Reimbursements(reimbursements).recordReimbursement.value(weiRaised)();
   weiRaised = 0;
   InactiveToken(token).resetInactiveTokenCycle();
   projectLeaderTracker.reset();
 }

 //tests need to be updated

 function extendDoomsDay (uint256 _days) external onlyVoting {
   _extendDoomsDay(_days);
 }

 function _extendDoomsDay(uint256 _days) internal canModifyDoomsDay {
    uint256 newDoomsDay = now.add(_days.mul(1728000));
    if (newDoomsDay > doomsDay) {
      doomsDay = newDoomsDay;
      canReOpen = false;
    }
 }

 function reduceDoomsDay (uint256 _days) public canModifyDoomsDay onlyVoting {
   doomsDay = doomsDay.sub(_days.mul(1728000));
 }
}
