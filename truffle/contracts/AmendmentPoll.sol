pragma solidity >=0.4.22 <0.6.0;
import './utility/Ownable.sol'
import './utility/SafeMath.sol';

contract AmendmentPoll is Ownable {
  using SafeMath for uint256;
  ActiveToken token;

  constructor (ActiveToken _token) public {
    token = _token;
  }

  struct VoteRecord {
    mapping(address => bool) voteCast;
  }

  uint256 public currentPollId;
  mapping(uint256 => VoterRecord) public voteRecordByPoll;
  uint256 public totalInFavor;
  uint256 public totalAgainst;

  uint256 private voteMultiplier = 10e30;

  function proposalsPassed () public returns (bool) {
    return totalInFavor.mul(voteMultiplier) > token.totalSupply().mul(voteMultiplier).mul(8).div(10);
  }

  function proposalsFailed () public returns (bool) {
    return totalAgainst.mul(voteMultiplier) >= token.totalSupply().mul(voteMultiplier).mul(2).div(10);
  }

  function openPoll () external onylOwner {
    totalInFavor = 0;
    totalAgainst = 0;
    currrentPollId = currentPollId.add(1);
    VoterRecord memory newVoteRecord;
    voteRecordByPoll[currentPollId] = newVoteRecord;
  }

  function castVote (bool inFavor) external {
    require(currentPollId != 0);
    require(!voteRecordByPoll[currentPollId].voteCast[msg.sender])

    uint256 voteAmount = token.balanceOf(msg.sender);

    require(voteAmount > 0);

    if (inFavor) {
      totalInFavor = totalInFavor.add(voteAmount);
    }
    else {
      totalAgainst = totalAgainst.add(voteAmount);
    }

    voteRecordByPoll[currentPollId].voteCast[msg.sender] = true;
  }
}
