pragma solidity 0.4.24;

import '../token/ERC20/MintableToken.sol';
import '../utility/SafeMath.sol';

contract GNIToken is MintableToken {
  using SafeMath for uint256;
  uint256 internal inactiveSupply_;
  uint256 internal participantCount_;



  constructor() public {
    totalSupply_ = 0;
    inactiveSupply_ = 0;
    participantCount_ = 0;
    balances[msg.sender] = 0;
  }

  /* struct Balance {
    uint256 active;
    uint256 inactive;
  } */

  mapping(uint256 => address) internal participants;
  /* mapping (address => Balance) internal balances; */
  mapping(address => uint256) internal activeBalances;


  function inactiveSupply() public view returns (uint256) {
    return inactiveSupply_;
  }

  function participantCount() public view returns (uint256) {
    return participantCount_;
  }

  function mint (address _to, uint256 _amount) public returns (bool) {
    require(super.mint(_to, _amount));

    inactiveSupply_ = inactiveSupply.add(_amount);
  }

  function transfer (address _to, uint256 _value) public returns (bool) {
    require(super.transfer(_to, _value));

    if (!participants[msg.sender]) {
      participantCount_ = participantCount_.add(1);
      participants[participantCount_] = msg.sender;
    }

    if (!participants[_to]) {
      participantCount_ = participantCount_.add(1);
      participants[participantCount_] = to_;
    }

    return true;
  }

  //for the number of paritipants...
  //find the balance of the participant
  //reduce the balance according to the activation rate
  //then, reduce the inactiveSupply according to the activation rate
  function activateTokens (uint256 activationRate) internal {
    for (uint256 i = 0; i < participantCount_; i.add(1)) {
      address participant = participants[i];
      uint256 tokensToActivate = balances[participant].mul(balances[participant].mul(activationRate));

      balances[participant] = inactiveBalance.sub(tokensToActivate);
      activeBalances[participant] = activeBalances[participant].add(tokensToActivate);
    }

    inactiveSupply_ = inactiveSupply_.sub(inactiveSupply_.mul(activationRate));
  }
}


//make inactiveTokenSupply variable
//override mint. call super, and then perform logic to update inactiveTokenSupply

//override transfer. call super, and then perform logic to store addresses (more below)
//make participantCount variable. It initializes at 1 and increments for every new address during transfers.
//make a mapping from participant id to address, storing the addresses in an array.
//use this mapping to get the balance of each participant
