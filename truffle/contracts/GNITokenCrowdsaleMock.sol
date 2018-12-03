pragma solidity ^0.4.24;

import './ProjectQueue.sol';
import './token/ERC20/Token.sol';
import './InvestorList.sol';
import './crowdsale/GNITokenCrowdsale.sol';
import './TokenStub.sol';
import './InvestorListStub.sol';
import './ProjectQueueStub.sol';
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
    ProjectQueueStub _projectQueue
  )
  public
  GNITokenCrowdsale(_openingTime, _doomsDay, _rate, _developer, _dividendWallet, _token, _investorList, _projectQueue) {}

  function receiveMockWei () external payable {

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
    openingTime = _openingTime;
  }

  function setMockDoomsDay (uint256 _doomsDay) public {
    /* doomsDay = doomsDay.div(doomDivisor); */
    doomsDay = _doomsDay;
  }

  function addMockProject (address projAddr) public {
    projectAddrs.push(projAddr);
  }

  function _addVoteCredit_ (address account, uint256 fromProjectId, uint256 votes) public {
    super.addVoteCredit_(account, fromProjectId, votes);
  }
  
  function addVoteCredit_ (address account, uint256 fromProjectId, uint256 votes) internal {
    CallData storage methodState = method['addVoteCredit_'];
    methodState.firstAddress = account;
    methodState.firstUint = fromProjectId;
    methodState.secondUint = votes;
  }
}
