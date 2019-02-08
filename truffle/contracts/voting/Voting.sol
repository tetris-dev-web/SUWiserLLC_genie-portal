pragma solidity >=0.4.22 <0.6.0;
import '../utility/Ownable.sol';
import '../project/Project.sol';
import '../crowdsale/GNITokenCrowdsale.sol';
import '../token/ERC20/Token.sol';
import '../projectLeader/ProjectLeaderTracker.sol';
import '../ECRecovery.sol';

contract Voting is Ownable {
  using ECRecovery for bytes32;
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

  mapping(address => bytes32) private voteForHash;
  mapping(address => bytes32) private voteAgainstHash;

  function () external payable {}

  function addProject (address  _project, bytes32 _voteForHash, bytes32 _voteAgainstHash) external onlyOwner {
    voteForHash[_project] = _voteForHash;
    voteAgainstHash[_project] = _voteAgainstHash;
  }

  function voteForProject(address  _project, address _voter, uint256 votes, bytes memory _signedMessage) public {
    require(Token(token).existingAccount(_voter));

    bytes32 unsignedMessage = voteForHash[_project];
    address recoveredVoter = unsignedMessage.recover(_signedMessage);

    require(recoveredVoter == _voter);

    _voteForProject(_project, _voter, votes);
  }

  function _voteForProject (address  _project, address _voter, uint256 votes) internal {
    Project(_project).vote(_voter, votes);
    Token(token).assign(_voter, votes);
    GNITokenCrowdsale(owner).extendDoomsDay(6);//this can be called externally
    handleVoteChange(_project);
  }

  function voteAgainstProject(address  _project, address _voter, uint256 votes, bytes memory _signedMessage) public {
    require(Token(token).existingAccount(_voter));

    bytes32 unsignedMessage = voteAgainstHash[_project];
    address recoveredVoter = unsignedMessage.recover(_signedMessage);

    require(recoveredVoter == _voter);

    Project(_project).voteAgainst(_voter, votes);
    handleVoteRemoval(_voter, _project, votes);
  }

   //this is for adding vote credit for each investor from the frontend after a project has been activated
   //call this function removeVotesFromIneligibleProject
   function removeVotesFromProject (address account, address  fromProjectAddr) public {
     uint256 votes = Project(fromProjectAddr).votesOf(account);
     Project(fromProjectAddr).removeVotes(account, votes);
     handleVoteRemoval(account, fromProjectAddr, votes);
   }

   function handleVoteRemoval (address account, address  fromProjectAddr, uint256 votes) internal {
     Token(token).freeUp(account, votes);
     GNITokenCrowdsale(owner).reduceDoomsDay(6);
     handleVoteChange(fromProjectAddr);
  }

  function handleVoteChange (address  votedForProj) internal {
    projectLeaderTracker.trackProject(votedForProj);
    GNITokenCrowdsale(owner).transferOnActivation();
    emit VoteChange(votedForProj, Project(votedForProj).totalVotes_());
  }
}
