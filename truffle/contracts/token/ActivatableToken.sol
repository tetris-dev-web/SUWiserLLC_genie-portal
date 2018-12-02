pragma solidity ^0.4.24;
import './ERC20/MintableToken.sol';
import '../Dividends.sol';

contract ActivatableToken is MintableToken {
  address public dividendWallet;

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

  function activeBalanceOf(address account) public view returns (uint256) {
    return activeBalances[account];
  }

  function inactiveBalanceOf(address account) public view returns (uint256) {
    return balances[account].sub(activeBalances[account]);
  }

  mapping(address => uint256) lastActivationPoints;
  uint256 totalActivationPoints;
  uint256 totalPendingActivations;
  uint256 private activationMultiplier = 10e30;

  function activate(address account, uint256 amount) internal {
    require(inactiveBalanceOf(account) >= amount);

    activeBalances[account] = activeBalances[account].add(amount);
    totalActiveSupply_ = totalActiveSupply_.add(amount);
  }

  modifier distributeOwedDividend(address account) {
    require(Dividends(dividendWallet).distributeDividend(account));
    _;
  }

  function pendingActivations(address account) internal returns (uint256) {
    uint256 pendingActivationPoints = totalActivationPoints.sub(lastActivationPoints[account]);
    uint256 inactiveAccountTokens = inactiveBalanceOf(account);
    return inactiveAccountTokens.mul(pendingActivationPoints).div(activationMultiplier);
  }

  //before this, we need to make sure that any pending dividends are distributed to the account. we need to do this to the correct dividend amount is distributed
  function activatePending (address account) external distributeOwedDividend(account) returns (bool) {
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
}
