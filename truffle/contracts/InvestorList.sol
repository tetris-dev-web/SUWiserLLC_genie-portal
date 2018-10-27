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
    uint256 amount
    );

  function investorCount() external view returns(uint256) {
    return investors.length;
  }

  //make this function only accessible by crowdsale for security
  function addrById (uint256 id) external view returns(address) {
    uint256 investorIdx = id.sub(1);
    return investors[investorIdx].addr;
  }

  //make this function only accessible by crowdsale for security
  function transferVoteCredit (uint256 id, uint256 projectId) external {
    uint256 investorIdx = id.sub(1);
    uint256 voteCredit = investors[investorIdx].votes[projectId];
    investors[investorIdx].votes[projectId] = 0;
    investors[investorIdx].voteCredit = investors[investorIdx].voteCredit.add(voteCredit);
  }

  //make this function only accessible by crowdsale for security
  function handleNewPurchase(uint256 projectId, uint256 votes, address investor) external {
    if (investorIds[investor] == 0) {
      addInvestor(investor);
    }
    investors[investorIds[investor]].votes[projectId] = investors[investorIds[investor]].votes[projectId].add(votes);
    emit LogVotes(investor, projectId, votes);
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
