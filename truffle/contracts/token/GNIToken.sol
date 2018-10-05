pragma solidity 0.4.24;

import '../token/ERC20/MintableToken.sol';
import '../utility/SafeMath.sol';

contract GNIToken is MintableToken {
  using SafeMath for uint256;
  uint256 internal inactiveSupply_;



  constructor() public {
  totalSupply_ = 0;
  inactiveSupply_ = 0;
  balances[msg.sender] = 0;
  }


  function inactiveSupply() public view returns (uint256) {
    return inactiveSupply_;
  }
  //for the number of paritipants...
  //find the balance of the participant
  //reduce the balance according to the activation rate
  //then, reduce the inactiveSupply according to the activation rate
  function activateTokens (uint256 activationRate) internal {

  }
}


//make inactiveTokenSupply variable
//override transfer. call super, and then perform logic to map store addresses
//override mint. call super, and then perform logic to update inactiveTokenSupply

//make participantCount variable. It initializes at 1 and increments for every new address during transfers.
//make a mapping from participant id to address, storing the addresses in an array.
//use this mapping to get the balance of each participant
