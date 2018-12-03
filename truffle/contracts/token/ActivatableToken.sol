pragma solidity ^0.4.24;
import './ERC20/MintableToken.sol';
import '../Dividends.sol';
import '../InvestorList.sol';
import '../ContractStub.sol';

contract ActivatableToken is MintableToken {
  address public dividendWallet;
  InvestorList private investorList;

  constructor (InvestorList _investorList) public {
    investorList = InvestorList(_investorList);
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

  function activeBalanceOf(address account) public view returns (uint256) {
    return activeBalances[account];
  }

  function inactiveBalanceOf(address account) public view returns (uint256) {
    return balances[account].sub(activeBalances[account]);
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

    activeBalances[account] = activeBalances[account].add(amount);
    totalActiveSupply_ = totalActiveSupply_.add(amount);
  }

  function pendingActivations(address account) internal returns (uint256) {
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
    require(inactiveBalanceOf(msg.sender) >= _value);
    super.transfer(_to, _value);
  }

  function transferActive(address _from, address _to, uint256 _value) internal {
    activeBalances[_to] = activeBalances[_to].add(_value);
    activeBalances[_from] = activeBalances[_from].sub(_value);

    investorList.addInvestor(_to);
    investorList.removeVoteCredit(_from, _value);
    investorList.addVoteCredit(_to, _value);
  }
}
