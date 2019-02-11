pragma solidity >=0.4.22 <0.6.0;
import '../utility/SafeMath.sol';
import '../project/Project.sol';
import '../projectLeader/ProjectLeaderTracker.sol';
import '../voting/Voting.sol';
import '../crowdsale/Activation.sol';
import '../utility/Ownable.sol';

contract ProjectFactory is Ownable {
  using SafeMath for uint256;
  Activation public activation;
  Voting public voting;
  ProjectLeaderTracker public projectLeaderTracker;
  address public dividendWallet;

  constructor (Activation _activation, Voting _voting, ProjectLeaderTracker _projectLeaderTracker, address _dividendWallet) public {
    activation = _activation;
    voting = _voting;
    projectLeaderTracker = _projectLeaderTracker;
    dividendWallet = _dividendWallet;
  }

  event ProjectPitch (
    address projectAddress,
    uint256 projectId
  );

  mapping(uint256 => address) internal projectAddress;
  uint256 public totalProjectCount;

  function projectById (uint256 id) public view returns (address ) {
    return projectAddress[id];
  }

  function createProject (
    string _projectInfo,
    address _developer,
    uint256 _valuation,
    uint256 _capitalRequired,
    uint256 _developerTokens,
    uint256 _investorTokens,
    string _cashFlow
  ) external onlyOwner
    returns (address)
  {
    address projectAddr = address(
      new Project(
        _projectInfo,
        _developer,
        _valuation,
        _capitalRequired,
        _developerTokens,
        _investorTokens,
        _cashFlow
      ));

    totalProjectCount = totalProjectCount.add(1);
    projectAddress[totalProjectCount] = projectAddr;

    Project(projectAddr).transferOwnership(address(Voting(voting)));
    Project(projectAddr).transferPrimary(address(Activation(activation)));

    ProjectLeaderTracker(projectLeaderTracker).handleProjectPitch();

    if (_capitalRequired == 0) {
      activation.activateProject(projectAddr, _capitalRequired);
    }

    emit ProjectPitch(projectAddr, totalProjectCount);
    return projectAddr;
  }
}
