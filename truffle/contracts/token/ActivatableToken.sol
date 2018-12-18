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

  //subtract inactive token amount from total
  //set a variable that says that each inactive balance is now possibly 0
  //make a mapping that indicates whether an accounts balance is actually still 0 for the current cycle
  //make a mapping that indicates which cycle we are on
  //variable that keeps track of the current cycle

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
    return balances[_who].total;
  }

  function activeBalanceOf(address account) public view returns (uint256) {
    return balances[account].active;
  }

  function inactiveBalanceOf(address account) public view returns (uint256) {
    //if it is not 0
    return balances[account].inactive;
    //else, we return 0
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
    /* totalInactiveSupply_ = totalInactiveSupply_.sub(amount); */
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
    balances[msg.sender].inactive = balances[msg.sender].inactive.sub(_value);
    balances[_to].inactive = balances[_to].inactive.add(_value);
    //we make sure that it is not 0 for the current cycle
  }

  function transferActive(address _from, address _to, uint256 _value) internal {
    balances[_from].active = balances[_from].active.sub(_value);
    balances[_to].active = balances[_to].active.add(_value);

    investorList.addInvestor(_to);
    investorList.removeVoteCredit(_from, _value);
    investorList.addVoteCredit(_to, _value);
  }
}
