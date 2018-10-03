pragma solidity 0.4.24;

import '../token/ERC20/MintableToken.sol';
import '../utility/SafeMath.sol';

contract GNIToken is MintableToken {
  using SafeMath for uint256;

  /* string public name = "GNIToken"; */
  string public symbol = "GNI";
  uint256 public decimals = 18;
  uint public INITIAL_SUPPLY = 0;



  constructor() public {
  totalSupply_ = INITIAL_SUPPLY;
  balances[msg.sender] = INITIAL_SUPPLY;
  }


}
