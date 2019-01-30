pragma solidity >=0.4.22 <0.6.0;
import './Voting.sol';
import './Project.sol';
import './crowdsale/GNITokenCrowdsale.sol';
import './token/ERC20/Token.sol';
import './ProjectLeaderTracker.sol';

contract SeedableVoting is Voting {
 constructor (Token _token, ProjectLeaderTracker _projectLeaderTracker)
  Voting(_token, _projectLeaderTracker)
  public {}

  function seed (address _project, address _voter, uint256 votes) public {
    require(Token(token).existingAccount(_voter));
    _voteForProject(_project, _voter, votes);
  }
}
