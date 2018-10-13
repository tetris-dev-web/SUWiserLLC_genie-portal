pragma solidity ^0.4.23;
import './token/Token.sol';

contract Escrow {
  Token token;

  constructor (Token _token) public {
    token = _token;
  }


}
