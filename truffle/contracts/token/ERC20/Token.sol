pragma solidity ^0.4.25;

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

  //make this only accessible by crowdsale or this contract
  function activate(address investor, uint256 amount) public {
    require(inactiveBalanceOf(investor) >= amount);
    activeBalances[investor] = activeBalances[investor].add(amount);
    totalActiveSupply_ = totalActiveSupply_.add(amount);
  }

  //we can remove the reference to investor list by requiring that the sender is the corwdsale. crowdsale can handle the logic for adding and removing credit instead.
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(activeBalances[msg.sender] >= _value);
    super.transfer(_to, _value);

    activate(_to, _value);
    activeBalances[msg.sender] = activeBalances[msg.sender].sub(_value);
    totalActiveSupply_ = totalActiveSupply_.sub(_value);

    investorList.removeVoteCredit(msg.sender, _value);
    investorList.addVoteCredit(_to, _value);
    return true;
  }

  //make this only callable by crowdsale
  function transferInactive(address _to, uint256 _value) external {
    require(inactiveBalanceOf(msg.sender) >= _value);
    super.transfer(_to, _value);
  }
}
