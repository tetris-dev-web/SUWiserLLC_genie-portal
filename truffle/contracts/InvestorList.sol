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
  mapping(address => uint256) internal investorIds;

  event LogVotes (
    address voter,
    uint256 projectId,
    uint256 votes
    );

  function investorCount () external view returns(uint256) {
    return investors.length;
  }

  //make this function only accessible by crowdsale for security
  function addrById (uint256 id) public view returns(address) {
    uint256 investorIdx = getInvestorIdx(id);
    return investors[investorIdx].addr;
  }

  function transferVotes (uint256 fromProjectId, uint256 toProjectId, uint256 votes) external {
    uint256 investorIdx = getInvestorIdx(investorIds[msg.sender]);
    require(investors[investorIdx].votes[fromProjectId] <= votes);
    investors[investorIdx].votes[fromProjectId] = investors[investorIdx].votes[fromProjectId].sub(votes);
    applyVotes(investorIdx, toProjectId, votes);
  }

  function applyVoteCredit (uint256 projectId, uint256 votes) external {
    uint256 investorIdx = getInvestorIdx(investorIds[msg.sender]);
    require(investors[investorIdx].voteCredit <= votes);
    investors[investorIdx].voteCredit = investors[investorIdx].voteCredit.sub(votes);
    applyVotes(investorIdx, projectId, votes);
  }

  //make this function only accessible by crowdsale for security
  function transferVoteCredit (uint256 investorId, uint256 projectId) external {
    uint256 investorIdx = getInvestorIdx(investorId);
    uint256 voteCredit = investors[investorIdx].votes[projectId];
    investors[investorIdx].votes[projectId] = 0;
    investors[investorIdx].voteCredit = investors[investorIdx].voteCredit.add(voteCredit);
  }

  //make this function only accessible by crowdsale for security
  function addVoteCredit (address investor, uint256 votes) external {
    uint256 investorIdx = getInvestorIdx(investorIds[investor]);
    investors[investorIdx].voteCredit = investors[investorIdx].voteCredit.add(votes);
  }

  //make this function only accessible by crowdsale for security
  function handleNewPurchase (uint256 projectId, uint256 votes, address investorId) external {
    if (investorIds[investorId] == 0) {
      addInvestor(investorId);
    }
    uint256 investorIdx = getInvestorIdx(investorIds[investorId]);
    applyVotes(investorIdx, projectId, votes);
  }

  function getInvestorIdx (uint256 id) private pure returns(uint256) {
    return id.sub(1);
  }

  function applyVotes (uint256 investorIdx, uint256 projectId, uint256 votes) private {
    investors[investorIdx].votes[projectId] = investors[investorIdx].votes[projectId].add(votes);
    emit LogVotes(addrById(investorIdx.add(1)), projectId, votes);
  }

  function addInvestor (address investor) private {
    Investor memory newInvestor;

    newInvestor.addr = investor;

    uint256 id = investors.length.add(1);
    newInvestor.id = id;
    investorIds[investor] = id;

    investors.push(newInvestor);
  }
}
