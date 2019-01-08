pragma solidity 0.4.24;

import './ERC20/Token.sol';
import './../InvestorList.sol';
import './../ContractStub.sol';

contract TokenMock is Token, ContractStub {
  constructor(InvestorList _investorList) public
  Token(_investorList) {}

  function setMockTotalActivationPonts (uint256 newTokens, uint256 inactiveSupply) public {
    totalActivationPoints = newTokens.mul(activationMultiplier).div(inactiveSupply);
  }

  function setMockLastActivationPoints (uint256 newTokens, uint256 inactiveSupply, address account) public {
    lastActivationPoints[account] = newTokens.mul(activationMultiplier).div(inactiveSupply);
  }

  function setMockTotalPendingActivations (uint256 amount) public {
    totalPendingActivations = amount;
  }

  function lastActivationPointsOf(address account) public view returns(uint256) {
    return lastActivationPoints[account];
  }

  function activate_ (address account, uint256 amount) public {
    super.activate(account, amount);
  }

  function activate (address account, uint256 amount) internal {
    super.activate(account, amount);
    CallData storage methodState = method['activate'];
    methodState.called = true;
    methodState.firstAddress = account;
    methodState.firstUint = amount;
  }

  function resetSupply () public {
    totalSupply_ = 0;
    totalActiveSupply_ = 0;
  }

  function initMockBalance (address addr, uint256 active, uint256 inactive) public {
    balances[addr].inactive = inactive;
    balances[addr].active = active;

    totalSupply_ = totalSupply_.add(active).add(inactive);
    totalActiveSupply_ = totalActiveSupply_.add(active);
  }

  function getMockInactiveTokenCycle () public returns (uint256) {
    return currentInactiveTokenCycle;
  }

  function setMockInactiveTokenCycle (uint256 cycle) public {
    currentInactiveTokenCycle = cycle;
  }

  function setMockCycleUpdateStatus (address account, bool status) public {
    inactiveTokenCycle[currentInactiveTokenCycle].updated[account] = status;
  }

  function getMockCycleUpdateStatus (address account) public returns (bool) {
    return inactiveTokenCycle[currentInactiveTokenCycle].updated[account];
  }
}
