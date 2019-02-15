pragma solidity >=0.4.22 <0.6.0;
import './utility/Ownable.sol'
import './utility/SafeMath.sol';
import './token/ActiveToken.sol';

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
  uint256 public totalInFavorWeighted;
  uint256 public totalAgainstWeighted;
  uint256 public totalInFavor;
  uint256 public totalAgainst;

  uint256 private voteMultiplier = 10e30;

  function proposalsPassed () public returns (bool) {
    return (
      totalInFavorWeighted.mul(voteMultiplier) > token.totalSupply().mul(voteMultiplier).mul(8).div(10) &&
      totalInFavor
      );
    ;
  }

  function proposalsFailed () public returns (bool) {
    return totalAgainstWeighted.mul(voteMultiplier) >= token.totalSupply().mul(voteMultiplier).mul(2).div(10);
  }

  function openPoll () external onylOwner {
    totalInFavorWeighted = 0;
    totalAgainstWeighted = 0;
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
      totalInFavorWeighted = totalInFavorWeighted.add(voteAmount);
      totalInFavor = totalInFavor.add(1);
    }
    else {
      totalAgainstWeighted = totalAgainstWeighted.add(voteAmount);
      totalAgainst = totalAgainst.add(1);
    }

    voteRecordByPoll[currentPollId].voteCast[msg.sender] = true;
  }
}
