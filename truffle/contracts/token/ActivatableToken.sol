pragma solidity 0.4.24;
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
  //still need to test this new functionality
  struct InactiveTokenCycle {
    mapping(address => bool) updated;
  }

  uint256 currentInactiveTokenCycle;
  mapping(uint256 => InactiveTokenCycle) inactiveTokenCycle;

  function resetInactiveTokenCycle () {
    totalSupply_ = totalSupply_.sub(totalInactiveSupply());
    currentInactiveTokenCycle = currentInactiveTokenCycle.add(1);

    InactiveTokenCycle memory newInactiveTokenCycle;
    inactiveTokenCycle[currentInactiveTokenCycle] = newInactiveTokenCycle;

    balances[msg.sender].total = 0;
    balances[msg.sender].inactive = 0;
    inactiveTokenCycle[currentInactiveTokenCycle].updated[msg.sender] = true;
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
    if (
      currentInactiveTokenCycle == 0 ||
      inactiveTokenCycle[currentInactiveTokenCycle].updated[_who] == true
      ) {
        return balances[_who].total;
      }
      return activeBalanceOf(_who);
  }

  function activeBalanceOf(address account) public view returns (uint256) {
    return balances[account].active;
  }

  function inactiveBalanceOf(address account) public view returns (uint256) {
    if (
      currentInactiveTokenCycle == 0 ||
      inactiveTokenCycle[currentInactiveTokenCycle].updated[account] == true
      ) {
        return balances[account].inactive;
      }
      return 0;
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
    require(inactiveBalanceOf(msg.sender) >= _value);
    super.transfer(_to, _value);

    if (inactiveTokenCycle[currentInactiveTokenCycle].updated[_to] == false) {
      balances[_to].inactive = 0;
      inactiveTokenCycle[currentInactiveTokenCycle].updated[_to] = true;
    }

    balances[msg.sender].inactive = balances[msg.sender].inactive.sub(_value);
    balances[_to].inactive = balances[_to].inactive.add(_value);
  }

  function transferActive(address _from, address _to, uint256 _value) internal {
    balances[_from].active = balances[_from].active.sub(_value);
    balances[_to].active = balances[_to].active.add(_value);

    investorList.addInvestor(_to);
    investorList.removeVoteCredit(_from, _value);
    investorList.addVoteCredit(_to, _value);
  }
}
