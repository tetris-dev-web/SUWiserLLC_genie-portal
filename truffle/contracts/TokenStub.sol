pragma solidity 0.4.25;
import './token/ERC20/Token.sol';
import './InvestorList.sol';
import './ContractStub.sol';

contract TokenStub is Token, ContractStub {
  constructor(InvestorList _investorList) public
  Token(_investorList) {}

  address mockInvestorA;
  address mockInvestorB;
  address mockInvestorC;

  uint256 balanceA = 12000000;
  uint256 balanceB = 48000000;
  uint256 balanceC = 30000000;

  function init(address investorA, address investorB, address investorC) public {
    mockInvestorA = investorA;
    mockInvestorB = investorB;
    mockInvestorC = investorC;
  }

  function totalActiveSupply () public view returns (uint256) {
    return balanceA.add(balanceB).add(balanceC);
  }

  function activeBalanceOf (address addr) public view returns (uint256) {
    uint256 b;

    if (addr == mockInvestorA) {
      b = balanceA;
    }

    if (addr == mockInvestorB) {
      b = balanceB;
    }

    if (addr == mockInvestorC) {
      b = balanceC;
    }

    return b;
  }

  function totalInactiveSupply () public view returns (uint256) {
    return balanceA.add(balanceB).add(balanceC);
  }

  function inactiveBalanceOf (address addr) public view returns (uint256) {
    uint256 b;

    if (addr == mockInvestorA) {
      b = balanceA;
    }

    if (addr == mockInvestorB) {
      b = balanceB;
    }

    if (addr == mockInvestorC) {
      b = balanceC;
    }

    return b;
  }

  function mint(
    address _to,
    uint256 _amount
  )
    public
    canMint
    returns (bool)
  {
    CallData storage methodState = method['mint'];
    methodState.called = true;

    if (methodState.firstAddress == address(0)) {
      methodState.firstAddress = _to;
    } else {
      methodState.secondAddress = _to;
    }

    if (methodState.firstUint == 0) {
      methodState.firstUint = _amount;
    } else {
      methodState.secondUint = _amount;
    }

    return true;
  }

  function transferInactive (address _to, uint256 _value) external {
    CallData storage methodState = method['transferInactive'];
    methodState.firstAddress = _to;
    methodState.firstUint = _value;
  }

  function activate (address investor, uint256 amount) public {
    CallData storage methodState = method['activate'];

    if (methodState.firstAddress == address(0)) {
      methodState.firstAddress = investor;
      methodState.firstUint = amount;
    } else if (methodState.secondAddress == address(0)) {
      methodState.secondAddress = investor;
      methodState.secondUint = amount;
    } else {
      methodState.thirdAddress = investor;
      methodState.thirdUint = amount;
    }
  }
}
