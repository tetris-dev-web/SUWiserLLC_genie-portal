pragma solidity 0.4.25;

import './ProjectQueue.sol';
import './token/ERC20/Token.sol';
import './InvestorList.sol';
import './crowdsale/GNITokenCrowdsale.sol';
import './TokenStub.sol';
import './InvestorListStub.sol';
import './ContractStub.sol';

contract GNITokenCrowdsaleMock is GNITokenCrowdsale, ContractStub {
constructor
  (
    uint256 _openingTime,
    uint256 _doomsDay,
    uint256 _rate,
    address _developer,
    address _dividendWallet,
    TokenStub _token,
    InvestorListStub _investorList,
    address _reimbursements
  )
  public
  GNITokenCrowdsale(_openingTime, _doomsDay, _rate, _developer, _dividendWallet, _token, _investorList, _reimbursements) {}

  /* function receiveMockWei () external payable {

  }

  function setMockWeiRaised (uint256 mockRaised_) public {
    weiRaised = mockRaised_;
  }

  function mockProjectCount () public view returns (uint256) {
    return projectAddrs.length;
  }

  function mockDoomsDay () public view returns (uint256) {
    return doomsDay;
  }

  function mockValuation () public view returns (uint256) {
    return totalValuation;
  }

  function lastAddedAddr () public view returns (address) {
    return projectAddrs[projectAddrs.length - 1];
  }

  function setMockOpening (uint256 _openingTime) public {
    /* openingTime = openingTime.mul(openMultiplier); */
    /* openingTime = _openingTime;
  } */

  /* function setMockDoomsDay (uint256 _doomsDay) public {
    /* doomsDay = doomsDay.div(doomDivisor); */
    /* doomsDay = _doomsDay;
  } */

  /* function addMockProject (address projAddr) public {
    projectAddrs.push(projAddr);
  } */

  /* function _addVoteCredit_ (address account, uint256 fromProjectId, uint256 votes) public {
    super.addVoteCredit_(account, fromProjectId, votes);
  } */

  /* function addVoteCredit_ (address account, uint256 fromProjectId, uint256 votes) internal {
    CallData storage methodState = method['addVoteCredit_'];
    methodState.firstAddress = account;
    methodState.firstUint = fromProjectId;
    methodState.secondUint = votes;
  } */

  /* function totalChecked () public view returns(uint256) {
    return checkCycle[currentCheckCycle].totalChecked;
  } */

  /* function checkedStatusOf(address projectAddr) public view returns (bool) {
    return checkCycle[currentCheckCycle].isChecked[projectAddr];
  } */

  /* function setStubProjectCount (uint256 count) public {
    inactiveProjectCount = count;
  }

  function setMockTotalChecked(uint256 num) public {
    checkCycle[currentCheckCycle].totalChecked = num;
  } */

  /* function setMockConfirmedLeaderStatus (bool status) public {
    tentativeLeaderConfirmed = status;
  }

  function setMockTentativeLeader (address mockAddr, uint256 mockCap) public {
    tentativeLeaderAddr = mockAddr;
    tentativeLeaderCapRequired = mockCap;
  } */

  /* function resetMockTentativeProject () public {
    tentativeLeaderAddr = address(0);
    tentativeLeaderCapRequired = 0;
    tentativeLeaderConfirmed = false;

    ProjectsChecked memory newProjectsChecked;
    currentCheckCycle = currentCheckCycle.add(1);
    checkCycle[currentCheckCycle] = newProjectsChecked;
  } */

  /* function considerTentativeLeaderShip (uint256 _projectId) public {
    CallData storage methodState = method['considerTentativeLeaderShip'];
    methodState.firstUint = _projectId;
  }

  function considerTentativeLeaderShip_ (uint256 _projectId) public {
    super.considerTentativeLeaderShip(_projectId);
  } */

  /* function attemptProjectActivation () public {
    CallData storage methodState = method['attemptProjectActivation'];
    methodState.called = true;
  }

  function attemptProjectActivation_ () public {
    super.attemptProjectActivation();
  } */

  /* function setMockWeiToReimburse (uint256 amount) public {
    weiToReimburse = amount;
  }

  function setMockInactiveTokensAtClosing (uint256 amount) public {
    inactiveTokensAtClosing = amount;
  }  */
}
