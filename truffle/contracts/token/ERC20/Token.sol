pragma solidity 0.4.25;

import '../ActivatableToken.sol';

contract Token is ActivatableToken {
  InvestorList private investorList;

  constructor (InvestorList _investorList) public ActivatableToken(_investorList) {
    investorList = InvestorList(_investorList);
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(activeBalances[msg.sender] >= _value);

    super.transfer(_to, _value);
    transferActive(msg.sender, _to, _value);

    return true;
  }

  function transferFrom (address _from, address _to, uint256 _value) public returns (bool) {
    require(_value <= activeBalances[_from]);

    super.transferFrom(_from, _to, _value);
    transferActive(_from, _to, _value);

    return true;
  }
}
