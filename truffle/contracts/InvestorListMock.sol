pragma solidity ^0.4.23;

import './InvestorList.sol';

contract InvestorListMock is InvestorList {
  function addTestInvestor (
      address investorAddr

    ) external {
    addInvestor(investorAddr);
  }

  function addTestInvestorVotes (uint256 investorId, uint256 voteCredit, uint256 projectId1, uint256 projectId2) external {

  }
}
