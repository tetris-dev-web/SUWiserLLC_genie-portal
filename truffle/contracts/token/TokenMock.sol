pragma solidity 0.4.25;

import './ERC20/Token.sol';
import './../InvestorList.sol';

contract TokenMock is Token {
  constructor(InvestorList _investorList) public
  Token(_investorList) {}

  function initMockBalance (address addr, uint256 active, uint256 inactive) public {
    balances[addr] = (active).add(inactive);
    activeBalances[addr] = active;
    totalSupply_ = totalSupply_.add(active).add(inactive);
    totalActiveSupply_ = totalActiveSupply_.add(active);
  }
}
