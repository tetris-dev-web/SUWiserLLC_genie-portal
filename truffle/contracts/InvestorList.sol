pragma solidity ^0.4.25;
import './utility/SafeMath.sol';
import './Project.sol';

contract InvestorList {
  using SafeMath for uint256;

  struct Investor {
    address addr;
    uint256 id;
    uint256 voteCredit;
  }

  //maps and id to an investor
  mapping(uint256 => Investor) internal investors;
  //maps an address to an investor id
  mapping(address => uint256) internal investorIds;
  uint256 internal investorCount_;

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
    return investors[id].addr;
  }
  //make only accessible by crowdsale
  function addInvestor (address investorAddr) external {
    if (investorIds[investorAddr] == 0) {
      Investor memory newInvestor;
      investorCount_ = investorCount_.add(1);

      uint256 id = investorCount_;
      newInvestor.id = id;
      newInvestor.addr = investorAddr;
      
      investorIds[investorAddr] = id;
      investors[id] = newInvestor;

    }
  }
  //make this function only accessible by crowdsale for security
  function addVoteCredit (address investorAddr, uint256 votes) public {
    investors[investorIds[investorAddr]].voteCredit = investors[investorIds[investorAddr]].voteCredit.add(votes);
  }
  //make only accessible by corwdsale
  function removeVoteCredit (address investorAddr, uint256 votes) public {
    require(investors[investorIds[investorAddr]].voteCredit >= votes);
    investors[investorIds[investorAddr]].voteCredit = investors[investorIds[investorAddr]].voteCredit.sub(votes);
  }
}


//one project to another
/* function transferVotes (address investorAddr, uint256 fromProjectId, uint256 toProjectId, uint256 votes) external {
uint256 investorId = investorIds[investorAddr];
removeVotes(investorId, fromProjectId, votes);
addVotes(investorId, toProjectId, votes);
} */
//creidt to project
/* function applyVotes (address investorAddr, uint256 projectId, uint256 votes) external {
uint256 investorId = investorIds[investorAddr];
removeVoteCredit(investorAddr, votes);
addVotes(investorId, projectId, votes);
} */

//project to credit
//make this function only accessible by crowdsale for security
/* function cacheVoteCredit (address investorAddr, uint256 projectId, uint256 votes) external {
uint256 investorId = investorIds[investorAddr];
removeVotes(investorId, projectId, votes);
addVoteCredit(investorAddr, votes);
} */

/* function addVotes (uint256 id, uint256 projectId, uint256 votes) internal {
investors[id].votes[projectId] = investors[id].votes[projectId].add(votes);
emit LogVotes(id, projectId, votes);
} */

/* function removeVotes (uint256 id, uint256 projectId, uint256 votes) internal {
require(investors[id].votes[projectId] >= votes);
investors[id].votes[projectId] = investors[id].votes[projectId].sub(votes);
emit LogVotes(id, projectId, votes);
} */

//make this function only accessible by crowdsale for security
/* function handleNewPurchase (uint256 projectId, uint256 votes, address investorAddr) external {
if (investorIds[investorAddr] == 0) {
addInvestor(investorAddr);
}
applyVotes(investorIds[investorAddr], projectId, votes);
} */
