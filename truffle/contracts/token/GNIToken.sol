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
  mapping(address => uint256) internal participantIds;
  /* mapping (address => Balance) internal balances; */
  mapping(address => uint256) internal activeBalances;


  function inactiveSupply() public view returns (uint256) {
    return inactiveSupply_;
  }

  function participantCount() public view returns (uint256) {
    return participantCount_;
  }

  function participantById(uint256 id) public view returns (address) {
    return participants[id];
  }

  function mint (address _to, uint256 _amount) public returns (bool) {
    require(super.mint(_to, _amount));

    inactiveSupply_ = inactiveSupply_.add(_amount);
  }

  function transfer (address _to, uint256 _value) public returns (bool) {
    require(super.transfer(_to, _value));

    if (participantIds[msg.sender] == 0) {
      participantCount_ = participantCount_.add(1);
      participants[participantCount_] = msg.sender;
      participantIds[msg.sender] = participantCount_;
    }

    if (participantIds[_to] == 0) {
      participantCount_ = participantCount_.add(1);
      participants[participantCount_] = _to;
      participantIds[_to] = participantCount_;
    }

    return true;
  }

  //for the number of paritipants...
  //find the balance of the participant
  //reduce the balance according to the activation rate
  //then, reduce the inactiveSupply according to the activation rate
  function activateTokens (uint256 tokens) public {
    uint256 activationRate = tokens.div(inactiveSupply_);

    inactiveSupply_ = inactiveSupply_.sub(tokens);

    for (uint256 i = 2; i <= participantCount_; i = i.add(1)) {
      address participant = participants[i];

      uint256 tokensToActivate = balances[participant].mul(activationRate);

      balances[participant] = balances[participant].sub(tokensToActivate);
      activeBalances[participant] = activeBalances[participant].add(tokensToActivate);
    }

  }
}


//make inactiveTokenSupply variable
//override mint. call super, and then perform logic to update inactiveTokenSupply

//override transfer. call super, nd then perform logic to store addresses (more below)
//make participantCount variable. It initializes at 1 and increments for every new address during transfers.
//make a mapping from participant id to address, storing the addresses in an array.
//use this mapping to get the balance of each participant
