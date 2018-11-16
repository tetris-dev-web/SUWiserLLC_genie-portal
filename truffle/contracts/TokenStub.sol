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

  uint256 activeBalanceA = 12000000;
  uint256 activeBalanceB = 48000000;
  uint256 activeBalanceC = 30000000;

  function init(address investorA, address investorB, address investorC) public {
    mockInvestorA = investorA;
    mockInvestorB = investorB;
    mockInvestorC = investorC;
  }

  function totalActiveSupply () public view returns (uint256) {
    return activeBalanceA.add(activeBalanceB).add(activeBalanceC);
  }

  function activeBalanceOf (address addr) public view returns (uint256) {
    uint256 b;

    if (addr == mockInvestorA) {
      b = activeBalanceA;
    }

    if (addr == mockInvestorB) {
      b = activeBalanceB;
    }

    if (addr == mockInvestorC) {
      b = activeBalanceC;
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
}
