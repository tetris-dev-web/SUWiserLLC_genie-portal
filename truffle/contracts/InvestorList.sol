pragma solidity ^0.4.23;
import './utility/SafeMath.sol';

contract InvestorList {
  using SafeMath for uint256;

  struct Investor {
    address addr;
    uint256 id;
    uint256 voteCredit;
    //maps from projectId to number of votes for that project
    mapping(uint256 => uint256) votes;
  }

  Investor[] public investors;
  /* mapping(uint256 => Investor) internal investors; */
  mapping(address => uint256) internal investorIds;

  event LogVotes (
    address voter,
    uint256 projectId,
    uint256 votes
    );

  function investorCount() external view returns(uint256) {
    return investors.length;
  }

  function getInvestorIdx (uint256 id) internal returns(uint256) {
    return id.sub(1);
  }

  //make this function only accessible by crowdsale for security
  function addrById (uint256 id) external view returns(address) {
    uint256 investorIdx = investorIdx(id);
    return investors[investorIdx].addr;
  }

  function transferVotes (uint256 fromProjectId, uint256 toProjectId, uint256 votes) external {
      uint256 investorIdx = getInvestorIdx(investorIds[msg.sender]);
      require(investors[investorIdx][fromProjectId].votes <= votes);
      investors[investorIdx][fromProjectId].votes = investors[investorIdx][fromProjectId].votes.sub(votes);
      applyVotes(investorIdx, toProjectId, votes);
  }

  function applyVoteCredit (uint256 projectId, uint256 votes) external {
    uint256 investorIdx = getInvestorIdx(investorIds[msg.sender]);
    require(investors[investorIdx].voteCredit <= votes);
    investors[investorIdx].voteCredit = investors[investorIdx].voteCredit.sub(votes);
    applyVotes(investorIdx, projectId, votes);
  }

  //make this function only accessible by crowdsale for security
  function transferVoteCredit (uint256 id, uint256 projectId) external {
    uint256 investorIdx = getInvestorIdx(id);
    uint256 voteCredit = investors[investorIdx].votes[projectId];
    investors[investorIdx].votes[projectId] = 0;
    investors[investorIdx].voteCredit = investors[investorIdx].voteCredit.add(voteCredit);
  }

  //make this function only accessible by crowdsale for security
  function handleNewPurchase(uint256 projectId, uint256 votes, address investor) external {
    if (investorIds[investor] == 0) {
      addInvestor(investor);
    }
    uint256 investorIdx = getInvestorIdx(investorIds[investor]);
    applyVotes(investorIdx, projectId, votes);
  }

  function applyVotes (uint256 investorIdx, uint256 projectId, uint256 votes) private {
    investors[investorIdx].votes[projectId] = investors[investorIdx].votes[projectId].add(votes);
    emit LogVotes(investorIdx.add(1), projectId, votes);
  }

  function addInvestor(address investor) private {
    Investor memory newInvestor;

    newInvestor.addr = investor;

    uint256 id = investors.length.add(1);
    newInvestor.id = id;
    investorIds[investor] = id;

    investors.push(newInvestor);
  }
}
