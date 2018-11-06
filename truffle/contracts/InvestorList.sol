pragma solidity ^0.4.23;
import './utility/SafeMath.sol';
import './Project.sol';

contract InvestorList {
  using SafeMath for uint256;

  struct Investor {
    address addr;
    uint256 id;
    uint256 voteCredit;
    //maps from projectId to number of votes for that project
    mapping(uint256 => uint256) votes;
  }

  //maps and id to an investor
  mapping(uint256 => Investor) investors;
  //maps an address to an investor id
  mapping(address => uint256) internal investorIds;
  uint256 private investorCount_;

  event LogVotes (
    address voter,
    uint256 projectId,
    uint256 votes
    );

  function investorCount () external view returns(uint256) {
    return investorCount_;
  }

  //make this function only accessible by crowdsale for security
  function addrById (uint256 id) public view returns(address) {
    /* uint256 id = getId(id); */
    return investors[id].addr;
  }

  function transferVotes (uint256 fromProjectId, uint256 toProjectId, uint256 votes) external {
    /* uint256 id = getInvestorIdx(investorIds[msg.sender]); */
    uint256 investorId = investorIds[msg.sender];
    require(investors[investorId].votes[fromProjectId] <= votes);
    investors[investorId].votes[fromProjectId] = investors[investorId].votes[fromProjectId].sub(votes);
    applyVotes(investorId, toProjectId, votes);
  }

  function applyVoteCredit (uint256 projectId, uint256 votes) external {
    /* uint256 id = getId(investorIds[msg.sender]); */
    uint256 investorId = investorIds[msg.sender];
    require(investors[investorId].voteCredit <= votes);
    investors[investorId].voteCredit = investors[investorId].voteCredit.sub(votes);
    applyVotes(investorId, projectId, votes);
  }

  //make this function only accessible by crowdsale for security
  function recordVoteCredit (uint256 investorId, uint256 projectId) external {
    /* uint256 id = getId(investorId); */
    uint256 voteCredit = investors[investorId].votes[projectId];
    investors[investorId].votes[projectId] = 0;
    investors[investorId].voteCredit = investors[investorId].voteCredit.add(voteCredit);
  }

  //make this function only accessible by crowdsale for security
  function addVoteCredit (address investorAddr, uint256 votes) external {
    /* uint256 id = getId(investorIds[investor]); */
    investors[investorIds[investorAddr]].voteCredit = investors[investorIds[investorAddr]].voteCredit.add(votes);
  }

  function removeVoteCredit (address investorAddr, uint256 votes) external {
    require(investors[investorIds[investorAddr]].voteCredit >= votes);
    investors[investorIds[investorAddr]].voteCredit = investors[investorIds[investorAddr]].voteCredit.sub(votes);
  }

  //make this function only accessible by crowdsale for security
  function handleNewPurchase (uint256 projectId, uint256 votes, address investorAddr) external {
    if (investorIds[investorAddr] == 0) {
      addInvestor(investorAddr);
    }
    /* uint256 id = getId(investorIds[investorId]); */
    applyVotes(investorIds[investorAddr], projectId, votes);
  }

  /* function getId (uint256 id) private pure returns(uint256) {
    return id.sub(1);
  } */

  function applyVotes (uint256 id, uint256 projectId, uint256 votes) private {
    investors[id].votes[projectId] = investors[id].votes[projectId].add(votes);
    emit LogVotes(addrById(id.add(1)), projectId, votes);
  }

  function addInvestor (address investorAddr) private {
    Investor memory newInvestor;

    newInvestor.addr = investorAddr;

    investorCount_ = investorCount_.add(1);

    uint256 id = investorCount_;
    newInvestor.id = id;
    investorIds[investorAddr] = id;

    investors[id] = newInvestor;
  }
}
