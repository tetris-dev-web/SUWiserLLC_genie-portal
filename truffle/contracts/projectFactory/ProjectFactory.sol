pragma solidity >=0.4.22 <0.6.0;
import '../utility/SafeMath.sol';
import '../project/Project.sol';
import '../projectLeader/ProjectLeaderTracker.sol';
import '../voting/Voting.sol';
import '../crowdsale/Activation.sol';
import '../utility/Ownable.sol';
import '../utility/CrowdsaleLocked.sol';
import '../crowdsale/GNITokenCrowdsale.sol';
import './ProjectFactoryHelper.sol';
//this will know developer and Crowdsale
contract ProjectFactory is CrowdsaleLocked {
  using SafeMath for uint256;
  Activation public activation;
  Voting public voting;
  ProjectLeaderTracker public projectLeaderTracker;
  GNITokenCrowdsale public crowdsale;
  address public developer;
  address public dividendWallet;
  ProjectFactoryHelper public projectFactoryHelper;

  constructor (
    ProjectFactoryHelper _projectFactoryHelper,
    GNITokenCrowdsale _crowdsale,
    address _developer,
    address _dividendWallet
    ) public {
    projectFactoryHelper = _projectFactoryHelper;
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
  {
    require(msg.sender == developer);
    (uint256 _developerTokens, uint256 _investorTokens) = GNITokenCrowdsale(crowdsale).mintNewProjectTokensAndExtendDoomsDay(_capitalRequired, _valuation);

    address projectAddr = address(
      new Project(
        _projectInfo,
        developer,
        _valuation,
        _capitalRequired,
        _developerTokens,
        _investorTokens,
       _cashFlow
      ));

    totalProjectCount = totalProjectCount.add(1);
    projectAddress[totalProjectCount] = projectAddr;
    projectFactoryHelper.handleNewProject(projectAddr);
    emit ProjectPitch(projectAddr, totalProjectCount);
  }
}