pragma solidity >=0.4.22 <0.6.0;
import '../utility/SafeMath.sol';
import '../project/Project.sol';
import '../projectLeader/ProjectLeaderTracker.sol';
import '../voting/Voting.sol';
import '../crowdsale/Activation.sol';
import '../utility/Ownable.sol';
import '../utility/CrowdsaleLocked.sol';
import '../crowdsale/GNITokenCrowdsale.sol';
//this will know developer and Crowdsale
contract ProjectFactory is CrowdsaleLocked {
  using SafeMath for uint256;
  Activation public activation;
  Voting public voting;
  ProjectLeaderTracker public projectLeaderTracker;
  GNITokenCrowdsale public crowdsale;
  address public developer;
  address public dividendWallet;

  constructor (
    Activation _activation,
    Voting _voting,
    ProjectLeaderTracker _projectLeaderTracker,
    GNITokenCrowdsale _crowdsale,
    address _developer,
    address _dividendWallet
    ) public {
    activation = _activation;
    voting = _voting;
    projectLeaderTracker = _projectLeaderTracker;
    crowdsale = _crowdsale;
    developer = _developer;
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
    uint256 _valuation,
    uint256 _capitalRequired,
    string _cashFlow
  ) external //make this developer instead
    returns (address)
  {
    /* require(msg.sender == developer); */
    /* (uint256 _developerTokens, uint256 _investorTokens) = GNITokenCrowdsale(crowdsale).mintNewProjectTokensAndExtendDoomsDay(_capitalRequired, _valuation); */
/*
    address projectAddr = address(
      new Project(
        _projectInfo,
        developer,
        _valuation,
        _capitalRequired,
        1000,
        1000, */
        /* _developerTokens, */
        /* _investorTokens, */
        /* _cashFlow
      )); */

    /* totalProjectCount = totalProjectCount.add(1);
    projectAddress[totalProjectCount] = projectAddr;

    Project(projectAddr).transferOwnership(address(Voting(voting)));
    Project(projectAddr).transferPrimary(address(Activation(activation)));

    ProjectLeaderTracker(projectLeaderTracker).handleProjectPitch();

    if (_capitalRequired == 0) {
      activation.activateProject(projectAddr, _capitalRequired);
    }

    emit ProjectPitch(projectAddr, totalProjectCount); */
    /* return projectAddr; */
    return address(0);
  }
}
