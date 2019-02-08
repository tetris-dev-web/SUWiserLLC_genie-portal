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
      ProjectLeaderTracker _projectLeaderTracker,
      address  _reimbursements,
      Voting _voting,
      Activation _activation
    )
    public
    GNITokenCrowdsale(_openingTime, _doomsDay, _rate, _developer, _dividendWallet, _token, _projectLeaderTracker, _reimbursements, _voting, _activation) {}

  function seedProject (string memory _title, uint256 capitalRequired, uint256 _valuation, string memory _lat, string memory _lng, bytes32 _voteForHash, bytes32 _voteAgainstHash) public returns (address ) {
    return _pitchProject(_title, capitalRequired, _valuation, _lat, _lng, _voteForHash, _voteAgainstHash);
  }
}
