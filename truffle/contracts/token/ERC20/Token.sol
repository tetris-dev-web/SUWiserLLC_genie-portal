pragma solidity ^0.4.24;

import './MintableToken.sol';
import '../../InvestorList.sol';

contract Token is MintableToken {
  InvestorList private investorList;

  constructor (InvestorList _investorList) public {
    investorList = InvestorList(_investorList);
  }

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

  function activate(address investor, uint256 amount) public onlyOwner {
    require(inactiveBalanceOf(investor) >= amount);

    activeBalances[investor] = activeBalances[investor].add(amount);
    totalActiveSupply_ = totalActiveSupply_.add(amount);
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
