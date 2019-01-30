pragma solidity ^0.4.24;
import './utility/Ownable.sol';
import './Project.sol';
import './crowdsale/GNITokenCrowdsale.sol';
import './token/ERC20/Token.sol';
import './ProjectLeaderTracker.sol';

contract Voting is Ownable {
  Token internal token;
  ProjectLeaderTracker internal projectLeaderTracker;

  constructor (Token _token, ProjectLeaderTracker _projectLeaderTracker) public {
    token = _token;
    projectLeaderTracker = _projectLeaderTracker;
  }

  event VoteChange (
    address addr,
    uint256 totalVotes
  );

  function voteForProject(address _project, address _voter, uint256 votes, bytes _signedMessage) public {
    require(Token(token).existingAccount(_voter));

    Project(_project).vote(_voter, votes, _signedMessage);
    Token(token).assign(_voter, votes);
    GNITokenCrowdsale(owner).extendDoomsDay(6);//this can be called externally
    handleVoteChange(_project);
  }

  function voteAgainstProject(address _project, address _voter, uint256 votes, bytes _signedMessage) public {
    Project(_project).voteAgainst(_voter, votes, _signedMessage);
    handleVoteRemoval(_voter, _project, votes);
  }

   //this is for adding vote credit for each investor from the frontend after a project has been activated
   //call this function removeVotesFromIneligibleProject
   function removeVotesFromProject (address account, address fromProjectAddr) external {
     uint256 votes = Project(fromProjectAddr).votesOf(account);
     Project(fromProjectAddr).removeVotes(account, votes);
     handleVoteRemoval(account, fromProjectAddr, votes);
   }

   function handleVoteRemoval (address account, address fromProjectAddr, uint256 votes) internal {
     Token(token).freeUp(account, votes);
     GNITokenCrowdsale(owner).reduceDoomsDay(6);
     handleVoteChange(fromProjectAddr);
  }

  function handleVoteChange (address votedForProj) internal {
    projectLeaderTracker.trackProject(votedForProj);
    GNITokenCrowdsale(owner).activateProject();
    emit VoteChange(votedForProj, Project(votedForProj).totalVotes_());
  }
}
