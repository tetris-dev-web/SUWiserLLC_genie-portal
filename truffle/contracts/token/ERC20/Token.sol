pragma solidity ^0.4.24;

import '../ActivatableToken.sol';
import '../../InvestorList.sol';

contract Token is ActivatableToken {
  InvestorList private investorList;


  constructor (InvestorList _investorList) public {
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

  function transferInactive(address _to, uint256 _value) external onlyOwner {
    require(inactiveBalanceOf(msg.sender) >= _value);
    super.transfer(_to, _value);
  }

  function transferActive(address _from, address _to, uint256 _value) internal {
    activeBalances[_to] = activeBalances[_to].add(_value);
    activeBalances[_from] = activeBalances[_from].sub(_value);

    investorList.addInvestor(_to);
    investorList.removeVoteCredit(_from, _value);
    investorList.addVoteCredit(_to, _value);
  }
}
