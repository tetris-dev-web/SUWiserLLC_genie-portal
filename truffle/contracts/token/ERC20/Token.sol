pragma solidity ^0.4.24;

import './StandardBurnableToken.sol';
import './MintableToken.sol';

contract Token is MintableToken {
  mapping(address => uint256) internal activeBalances;

  uint256 internal totalActiveSupply_;

  function totalActiveSupply() public view returns (uint256) {
    return totalActiveSupply_;
  }

  function totalInactiveSupply() public view returns (uint256) {
    return totalSupply_.sub(totalActiveSupply_);
  }

  function activeBalanceOf(address addr) public view returns (uint256) {
    return activeBalances[addr];
  }

  function inactiveBalanceOf(address addr) public view returns (uint256) {
    return balances[addr].sub(activeBalances[addr]);
  }

  //make this only accessible by crowdsale or this contract
  function activate(address investor, uint256 amount) public {
    activeBalances[investor] = activeBalances[investor].add(amount);
    totalActiveSupply_ = totalActiveSupply_.add(amount);
  }

  function transferActiveTokens(address from, address to, uint256 tokens) external {
    transferFrom(from, to, tokens);
    activate(to, tokens);
  }
}
