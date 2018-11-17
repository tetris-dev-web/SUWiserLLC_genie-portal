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
    TokenStub _token,
    InvestorListStub _investorList,
    ProjectQueueStub _projectQueue
  )
  public
  GNITokenCrowdsale(_openingTime, _doomsDay, _rate, _developer, _token, _investorList, _projectQueue) {}

  function mockProjectCount () public returns (uint256) {
    return projectAddrs.length;
  }

  function mockDoomsDay () public returns (uint256) {
    return doomsDay;
  }

  function mockValuation () public returns (uint256) {
    return totalValuation;
  }

  function lastAddedAddr () public returns (address) {
    return projectAddrs[projectAddrs.length - 1];
  }

  function increaseMockOpening (uint256 openMultiplier) public {
    openingTime = openingTime.mul(openMultiplier);
  }

  function decreaseMockDoomsDay (uint256 doomDivisor) public {
    doomsDay = doomsDay.div(doomDivisor);
  }

  function addMockProject (address projAddr) public {
    projectAddrs.push(projAddr);
  }

  function tryActivateProject () internal {
    CallData storage methodState = method["tryActivateProject"];
    methodState.called = true;
  }
}
