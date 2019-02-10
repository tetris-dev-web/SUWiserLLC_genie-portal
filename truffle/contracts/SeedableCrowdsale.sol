pragma solidity >=0.4.22 <0.6.0;
import './crowdsale/GNITokenCrowdsale.sol';
import './token/ERC20/Token.sol';
import './projectLeader/ProjectLeaderTracker.sol';
import './reimbursements/Reimbursements.sol';
import './voting/Voting.sol';

contract SeedableCrowdsale is GNITokenCrowdsale {
  constructor
    (
      uint256 _openingTime,
      uint256 _doomsDay,
      uint256 _rate,
      address  _developer,
      address  _dividendWallet,
      Token _token,
      ProjectFactory _projectFactory,
      ProjectLeaderTracker _projectLeaderTracker,
      address  _reimbursements,
      Voting _voting,
      Activation _activation
    )
    public
    GNITokenCrowdsale(_openingTime, _doomsDay, _rate, _developer, _dividendWallet, _token, _projectFactory, _projectLeaderTracker, _reimbursements, _voting, _activation) {}

  function seedProject (
    string memory _projectInfo,
    uint256 _capitalRequired,
    uint256 _valuation,
    string _cashflow,
    bytes32 _voteForHash,
    bytes32 _voteAgainstHash
    ) public {
    _pitchProject(
          _projectInfo,
          _capitalRequired,
          _valuation,
          _cashflow,
          _voteForHash,
          _voteAgainstHash
        );
  }
}
