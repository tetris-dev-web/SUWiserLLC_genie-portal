pragma solidity ^0.4.23;

import './InvestorList.sol';

contract InvestorListMock is InvestorList {
  function addTestInvestor (
      address investorAddr,
      uint256 voteCredit
    ) external {
      Investor memory newInvestor;

      newInvestor.addr = investorAddr;

      investorCount_ = investorCount_.add(1);

      uint256 id = investorCount_;
      newInvestor.id = id;
      newInvestor.voteCredit = voteCredit;
      investorIds[investorAddr] = id;

      investors[id] = newInvestor;
  }

  function getVoteCredit (address investor) public view returns (uint256) {
    return investors[investorIds[investor]].voteCredit;
  }
}
