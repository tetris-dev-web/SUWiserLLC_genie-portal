pragma solidity 0.4.25;

import './Project.sol';

contract ProjectMock is Project {
  constructor (
    uint256 _id,
    string _name,
    address _developer,
    uint256 _valuation,
    uint256 _capitalRequired,
    uint256 _developerTokens,
    uint256 _investorTokens,
    string _lat,
    string _lng
    ) public Project(
      _id,
      _name,
      _developer,
      _valuation,
      _capitalRequired,
      _developerTokens,
      _investorTokens,
      _lat,
      _lng
      ) {}

  function initMockVoter (address addr, uint256 voteAmount) public {
    votes[addr] = voteAmount;
    totalVotes = totalVotes.add(voteAmount);
  }

  function changeClosingTime (uint256 time) public {
    closingTime = time;
  }

  function checkDividendWallet () public view returns (address) {
    return dividends;
  }

  function checkManagerStatus (address account) public view returns (bool) {
    return managers[account];
  }

  function checkVoteAmount (address voter) public view returns (uint256) {
    return votes[voter];
  }
}
