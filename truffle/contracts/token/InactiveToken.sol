pragma solidity >=0.4.22 <0.6.0;

import '../utility/CrowdsaleLocked.sol';
import '../utility/ActivationLocked.sol';
import './ActiveToken.sol';

//we need to activate pending on transfer
contract InactiveToken is ERC20Base, CrowdsaleLocked, ActivationLocked {
  ActiveToken public activeToken;

  constructor (VotingToken _votingToken, ActiveToken _activeToken) public
  ERC20Base(_votingToken) {
    activeToken = ActiveToken(_activeToken);
  }

  struct InactiveTokenCycle {
    uint256 totalUpdated;
    mapping(address => bool) updated;
    uint256 totalAccounts;
    mapping(uint256 => address) accountById;
    mapping (address => uint256) idByAccount;
  }

  uint256 internal currentInactiveTokenCycle;
  mapping(uint256 => InactiveTokenCycle) internal inactiveTokenCycle;

  function resetInactiveTokenCycle () public onlyCrowdsale {
    _totalSupply = 0;
    currentInactiveTokenCycle = currentInactiveTokenCycle.add(1);

    InactiveTokenCycle memory newInactiveTokenCycle;
    inactiveTokenCycle[currentInactiveTokenCycle] = newInactiveTokenCycle;


    updateAccountCycle(msg.sender);
  }

  function balanceOf(address _who) public view returns (uint256) {
    if (accountCycleUpdated(_who)) {
      return super.balanceOf(_who);
    }
    return 0;
  }

  function transfer (address _to,  uint256 _value) public returns (bool) {
    prepareTransfer(msg.sender, _to);
    return super.transfer(_to, _value);
  }

  function transferFrom (address from, address to, uint256 value) public returns (bool) {
    prepareTransfer(from, to);
    return super.transferFrom(from, to, value);
  }

  function prepareTransfer (address from, address to) internal {
    prepareBalanceChange(from);
    prepareBalanceChange(to);
    recordAccount(to);
  }

  function mint(address account, uint256 value) external onlyCrowdsale {
    prepareForBalanceChange(account);
    recordAccount(_to);
    _mint(account, value);
  }

  mapping(address => uint256) internal lastActivationPoints;
  uint256 public totalActivationPoints;
  uint256 public totalPendingActivations;
  uint256 internal activationMultiplier = 10e30;


  function activate(address account, uint256 amount) internal {
    activeToken.mint(account, amount);
    _burn(account, amount);
  }

  function pendingActivations(address account) public view returns (uint256) {
    require(account != crowdsale);
    uint256 pendingActivationPoints = totalActivationPoints.sub(lastActivationPoints[account]);
    uint256 inactiveAccountTokens = super.balanceOf(account);
    return inactiveAccountTokens.mul(pendingActivationPoints).div(activationMultiplier);
  }

  function activatePending (address account) public returns (bool) {
    if (account != crowdsale) {
      uint256 tokens = pendingActivations(account);
      activate(account, tokens);
      lastActivationPoints[account] = totalActivationPoints;
      totalPendingActivations = totalPendingActivations.sub(tokens);
    }
    return true;
  }

  function increasePendingActivations(uint256 amount) external onlyActivation {//should only be callable by activation
    require(
      inactiveTokenCycle[currentInactiveTokenCycle].totalUpdated ==
      inactiveTokenCycle[currentInactiveTokenCycle.sub(1)].totalAccounts
    );

    uint256 inactiveSupply = totalSupply().sub(balanceOf(crowdsale())).sub(totalPendingActivations);
    require(totalPendingActivations.add(amount) < inactiveSupply());

    uint256 newActivationPoints = amount.mul(activationMultiplier).div(inactiveSupply);
    totalActivationPoints = totalActivationPoints.add(newActivationPoints);
    totalPendingActivations = totalPendingActivations.add(amount);
  }

  function recordAccount (account) internal {
    if (inactiveTokenCycle[currentInactiveTokenCycle].idByAccount[_to] == 0) {
      inactiveTokenCycle[currentInactiveTokenCycle].totalAccounts = inactiveTokenCycle[currentInactiveTokenCycle].totalAccounts.add(1);
      inactiveTokenCycle[currentInactiveTokenCycle].idByAccount[account] = inactiveTokenCycle[currentInactiveTokenCycle].totalAccounts;
      inactiveTokenCycle[currentInactiveTokenCycle].accountById[inactiveTokenCycle[currentInactiveTokenCycle].totalAccounts] = account;
    }
  }

  function updateAccountCycle (address account) public {
    require(!accountCycleUpdated(account));//maybe this should just be a conditional statement instead?

    activatePending(account);
    _balances[account] = 0;
    inactiveTokenCycle[currentInactiveTokenCycle].updated[account] = true;

    if (inactiveTokenCycle[currentInactiveTokenCycle.sub(1)].idByAccount[account] != 0) {
      inactiveTokenCycle.totalUpdated = inactiveTokenCycle.totalUpdated.add(1);
    }
  }

  function accountCycleUpdated (address account) public view returns (bool) {
    return inactiveTokenCycle[currentInactiveTokenCycle].updated[account] == true || currentInactiveTokenCycle == 0;
  }

  function prepareBalanceChange (address account) internal {
    if (!accountCycleUpdated(account)) {
      updateAccountCycle(account);
    } else {
      activatePending(account);
    }
  }
}
