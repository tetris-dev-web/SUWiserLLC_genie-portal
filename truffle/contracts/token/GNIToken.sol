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

  function transferTokens (address from, uint256 _value) public returns (bool) {
    require(_value <= balances[from]);
    require(msg.sender != address(0));

    balances[from] = balances[from].sub(_value);
    balances[msg.sender] = balances[msg.sender].add(_value);
    emit Transfer(from, msg.sender, _value);
    return true;
  }

}
