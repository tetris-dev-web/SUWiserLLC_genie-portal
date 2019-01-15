pragma solidity ^0.4.24;

import '../ActivatableToken.sol';

contract Token is ActivatableToken {
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(balances[msg.sender].active >= _value && _to != address(0));
    require(freedUpBalanceOf(msg.sender) >= _value);

    initAccount(_to);
    transferActive(msg.sender, _to, _value);
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom (address _from, address _to, uint256 _value) public returns (bool) {
    require(_value <= balances[_from].active);
    require(_to != address(0));
    require(freedUpBalanceOf(_from) >= _value);

    initAccount(_to);
    super.transferFrom(_from, _to, _value);
    transferActive(_from, _to, _value);
    emit Transfer(msg.sender, _to, _value);
    return true;
  }
}
