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
    mapping(address => bool) updated;
  }

  uint256 internal currentInactiveTokenCycle;
  mapping(uint256 => InactiveTokenCycle) internal inactiveTokenCycle;

  function resetInactiveTokenCycle () public onlyCrowdsale {
    _totalSupply = 0;
    currentInactiveTokenCycle = currentInactiveTokenCycle.add(1);

    InactiveTokenCycle memory newInactiveTokenCycle;
    inactiveTokenCycle[currentInactiveTokenCycle] = newInactiveTokenCycle;

    _updateAccountCycle(msg.sender);
  }

  function balanceOf(address _who) public view returns (uint256) {
    if (accountCycleUpdated(_who)) {
      return super.balanceOf(_who);
    }
    return 0;
  }

  function transfer (address _to,  uint256 _value) public returns (bool) {
    if (!accountCycleUpdated(_to)) {
      _updateAccountCycle(_to);
    }
    return super.transfer(_to, _value);
  }

  function mint(address account, uint256 value) external onlyCrowdsale {
    if (!accountCycleUpdated(account)) {
      _updateAccountCycle(account);
    }
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
    require(account != crowdsale());
    uint256 pendingActivationPoints = totalActivationPoints.sub(lastActivationPoints[account]);
    uint256 inactiveAccountTokens = balanceOf(account);
    return inactiveAccountTokens.mul(pendingActivationPoints).div(activationMultiplier);
  }

  function activatePending (address account) external returns (bool) {
    uint256 tokens = pendingActivations(account);
    activate(account, tokens);
    lastActivationPoints[account] = totalActivationPoints;
    totalPendingActivations = totalPendingActivations.sub(tokens);
    return true;
  }

  function increasePendingActivations(uint256 amount) external onlyActivation {//should only be callable by activation
    uint256 inactiveSupply = totalSupply().sub(balanceOf(crowdsale())).sub(totalPendingActivations);
    uint256 newActivationPoints = amount.mul(activationMultiplier).div(inactiveSupply);
    totalActivationPoints = totalActivationPoints.add(newActivationPoints);
    totalPendingActivations = totalPendingActivations.add(amount);
  }

  function updateAccountCycle (address account) external {
    require(msg.sender == address(votingToken));
    _updateAccountCycle(account);
  }

  function _updateAccountCycle (address account) internal {
    _balances[account] = 0;
    _balances[account] = 0;
    inactiveTokenCycle[currentInactiveTokenCycle].updated[account] = true;
  }

  function accountCycleUpdated (address account) public view returns (bool) {
    return inactiveTokenCycle[currentInactiveTokenCycle].updated[account] == true || currentInactiveTokenCycle == 0;
  }
}
