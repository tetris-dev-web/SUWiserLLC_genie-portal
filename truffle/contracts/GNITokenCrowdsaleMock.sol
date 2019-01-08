pragma solidity 0.4.24;

import './ProjectQueue.sol';
import './token/ERC20/Token.sol';
import './InvestorList.sol';
import './crowdsale/GNITokenCrowdsale.sol';
import './TokenStub.sol';
import './InvestorListStub.sol';
import './ContractStub.sol';
import './ProjectLeaderBoard.sol';

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
    ProjectLeaderBoard _projectLeaderBoard,
    address _reimbursements
  )
  public
  GNITokenCrowdsale(_openingTime, _doomsDay, _rate, _developer, _dividendWallet, _token, _investorList, _projectLeaderBoard, _reimbursements) {}

  function receiveMockWei () external payable {

  }

  function setStubProjectCount (uint256 count) public {
    totalProjectCount = count;
  }

  function setMockWeiRaised (uint256 mockRaised_) public {
    weiRaised = mockRaised_;
  }

  function mockProjectCount () public view returns (uint256) {
    return totalProjectCount;
  }

  function mockDoomsDay () public view returns (uint256) {
    return doomsDay;
  }

  function mockValuation () public view returns (uint256) {
    return totalValuation;
  }

  function lastAddedAddr () public view returns (address) {
    return projectAddress[totalProjectCount];
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
    totalProjectCount = totalProjectCount.add(1);
    projectAddress[totalProjectCount] = projAddr;
  }

  function _removeVotesFromProject_ (address account, address fromProjectAddr, uint256 votes) public {
    super.removeVotesFromProject_(account, fromProjectAddr, votes);
  }

  function removeVotesFromProject_ (address account, address fromProjectAddr, uint256 votes) internal {
    CallData storage methodState = method['removeVotesFromProject_'];
    methodState.firstAddress = account;
    methodState.secondAddress = fromProjectAddr;
    methodState.firstUint = votes;
  }

  function authenticateVoter(bytes _signedMessage, address voter, bytes32 unsignedMessage) internal {
    CallData storage methodState = method['authenticateVoter'];
    methodState.firstAddress = voter;
  }

  function setMockVoteHash (address projectAddr, bytes32 mockHash) {
    voteHash[projectAddr] = mockHash;
  }

  function setMockRemoveHash (address projectAddr, bytes32 mockHash) {
    removeVoteHash[projectAddr] = mockHash;
  }

  function viewMockVoteHash (address projectAddress) public view returns (bytes32) {
    return voteHash[projectAddress];
  }

  function viewMockRemoveVoteHash (address projectAddress) public view returns (bytes32) {
    return removeVoteHash[projectAddress];
  }

  function mockProjectById (uint256 id) public view returns (address) {
    return projectAddress[id];
  }
}
