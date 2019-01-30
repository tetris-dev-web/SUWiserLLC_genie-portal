pragma solidity ^0.4.24;
import './ERC20/MintableToken.sol';
import '../Dividends.sol';
import '../ContractStub.sol';

contract ActivatableToken is MintableToken {
  address public dividendWallet;
  struct InactiveTokenCycle {
    mapping(address => bool) updated;
  }

  uint256 internal currentInactiveTokenCycle;
  mapping(uint256 => InactiveTokenCycle) internal inactiveTokenCycle;

  //should only be callable by the crowdsale
  function resetInactiveTokenCycle (address developer) public {
    totalSupply_ = totalSupply_.sub(totalInactiveSupply());
    currentInactiveTokenCycle = currentInactiveTokenCycle.add(1);

    InactiveTokenCycle memory newInactiveTokenCycle;
    inactiveTokenCycle[currentInactiveTokenCycle] = newInactiveTokenCycle;

    /* balances[msg.sender].total = 0; */
    updateAccountCycle(msg.sender);
    updateAccountCycle(developer);
  }

  function initializeDividendWallet(address _dividendWallet) public onlyOwner {
    dividendWallet = _dividendWallet;
  }

  mapping(address => uint256) internal activeBalances;

  uint256 internal totalActiveSupply_;

  function totalActiveSupply() public view returns (uint256) {
    return totalActiveSupply_;
  }

  function totalInactiveSupply() public view returns (uint256) {
    return totalSupply_.sub(totalActiveSupply_);
  }

  function balanceOf(address _who) public view returns (uint256) {
    if (accountCycleUpdated(_who)) {
      return balances[_who].active.add(balances[_who].inactive);
    }
    return activeBalanceOf(_who);
  }

  function activeBalanceOf(address account) public view returns (uint256) {
    return balances[account].active;
  }

  function inactiveBalanceOf(address account) public view returns (uint256) {
    if (accountCycleUpdated(account)) {
      return balances[account].inactive;
    }
    return 0;
  }

  function assignedBalanceOf (address account) public view returns (uint256) {
    /* return balanceOf(account).sub(freedUpBalanceOf(account)); */
    if (accountCycleUpdated(account)) {
      return balances[account].assigned;
    }
    return 0;
  }

  function freedUpBalanceOf (address account) public view returns (uint256) {
    /* if (accountCycleUpdated(account)) {
      return balances[account].freedUp;
    }
    return activeBalanceOf(account); */
    return balanceOf(account).sub(assignedBalanceOf(account));
  }

  mapping(address => uint256) internal lastActivationPoints;
  uint256 public totalActivationPoints;
  uint256 public totalPendingActivations;
  uint256 internal activationMultiplier = 10e30;

  function distributeOwedDividend(address account) internal {
    Dividends(dividendWallet).distributeDividend(account);
  }

  function activate(address account, uint256 amount) internal {
    require(inactiveBalanceOf(account) >= amount);
    distributeOwedDividend(account);

    balances[account].inactive = balances[account].inactive.sub(amount);
    balances[account].active = balances[account].active.add(amount);
    totalActiveSupply_ = totalActiveSupply_.add(amount);
  }

  function pendingActivations(address account) public returns (uint256) {
    uint256 pendingActivationPoints = totalActivationPoints.sub(lastActivationPoints[account]);
    uint256 inactiveAccountTokens = inactiveBalanceOf(account);
    return inactiveAccountTokens.mul(pendingActivationPoints).div(activationMultiplier);
  }

  function activatePending (address account) external returns (bool) {
    uint256 tokens = pendingActivations(account);
    activate(account, tokens);
    lastActivationPoints[account] = totalActivationPoints;
    totalPendingActivations = totalPendingActivations.sub(tokens);
    return true;
  }

  function increasePendingActivations(uint256 amount) external {
    uint256 inactiveSupply = totalInactiveSupply().sub(totalPendingActivations);
    uint256 newActivationPoints = amount.mul(activationMultiplier).div(inactiveSupply);
    totalActivationPoints = totalActivationPoints.add(newActivationPoints);
    totalPendingActivations = totalPendingActivations.add(amount);
  }

  function transferInactive(address _to, uint256 _value) external onlyOwner {
    require(_value != 0);
    require(inactiveBalanceOf(msg.sender) >= _value);
    require(freedUpBalanceOf(msg.sender) >= _value);
    super.transfer(_to, _value);//we should change this

    if (!accountCycleUpdated(_to)) {
      updateAccountCycle(_to);
    }

    balances[msg.sender].inactive = balances[msg.sender].inactive.sub(_value);
    balances[_to].inactive = balances[_to].inactive.add(_value);
  }

  function transferActive(address _from, address _to, uint256 _value) internal {
    if (!accountCycleUpdated(_to)) {
      updateAccountCycle(_to);
    }
    balances[_from].active = balances[_from].active.sub(_value);
    balances[_to].active = balances[_to].active.add(_value);
  }

  function freeUp (address account, uint256 amount) public onlyOwner {
    require(amount != 0 && assignedBalanceOf(account) >= amount);

    //if we reach here, it means the account must be updated with the current cycle bc otherwise assignedBalanceOf returns 0
    balances[account].assigned = balances[account].assigned.sub(amount);
  }

  function assign (address account, uint256 amount) public onlyOwner {
    require(freedUpBalanceOf(account) >= amount);

    if (!accountCycleUpdated(account)) {
      updateAccountCycle(account);
    }

    balances[account].assigned = balances[account].assigned.add(amount);
  }



  function updateAccountCycle (address account) internal {
    balances[account].inactive = 0;
    balances[account].assigned = 0;
    inactiveTokenCycle[currentInactiveTokenCycle].updated[account] = true;
  }

  function accountCycleUpdated (address account) internal returns (bool) {
    return inactiveTokenCycle[currentInactiveTokenCycle].updated[account] == true;
  }
}
