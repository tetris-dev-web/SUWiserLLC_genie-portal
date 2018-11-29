pragma solidity 0.4.24;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import '../ProjectQueue.sol';
import '../Project.sol';
import '../ProjectStub.sol';
import '../token/ERC20/Token.sol';
import '../InvestorList.sol';

contract GNITokenCrowdsale is TimedCrowdsale {
  using SafeMath for uint256;
  uint256 public totalValuation;
  InvestorList public investorList;
  ProjectQueue public projectQueue;
  address public dividendWallet;

  constructor
      (
        uint256 _openingTime,
        uint256 _doomsDay,
        uint256 _rate,
        address _developer,
        address _dividendWallet,
        Token _token,
        InvestorList _investorList,
        ProjectQueue _projectQueue
      )
      public
      Crowdsale(_rate, _developer, _token)
      TimedCrowdsale(_openingTime, _doomsDay) {
        investorList = InvestorList(_investorList);
        projectQueue = ProjectQueue(_projectQueue);
        totalValuation = 0;
        dividendWallet = _dividendWallet;
  }

  address[] public projectAddrs;
  uint256 projectCount;

//after this, the developer has to approve this contract to spend the amount of inactive tokens associated with developers on its behalf
 function pitchProject(string _name, uint256 capitalRequired, uint256 _valuation, string _lat, string _lng) public {
   (uint256 developerTokens, uint256 investorTokens) = tokensToMint(_valuation, capitalRequired);

   Token(token).mint(developer, developerTokens);//test if this is called
   Token(token).mint(this, investorTokens);//test if this is called

   totalValuation = totalValuation.add(_valuation);

   _extendDoomsDay(90);

    uint256 _id = projectCount;
    address projectAddr = new Project(_id, _name, developer, dividendWallet, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng);
    projectAddrs.push(projectAddr);
    projectQueue.enqueue(projectAddr);//we want to test if this is called
    projectCount = projectCount.add(1);
    Project(projectAddr).log();
 }

 function tokensToMint (uint256 valuation, uint256 investorValue) private view returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);
   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 modifier activatePendingTokens_() {
   require(activateTokens(msg.sender));
   _;
 }

   address tentativeLeaderAddr;
   uint256 tentativeLeaderVotes;
   uint256 tentativeLeaderCapRequired;
   uint256 tentativeLeaderClosingTime;
   bool tentativeLeaderConfirmed;


   struct ProjectsChecked {
     mapping(address => bool) isChecked;
     uint256 totalChecked;
   }

   ProjectsChecked projectsChecked;

 //before this, we need to execute any pending token activations for the sender account. We need to do this so that the correct number of tokens are activated
 function buyTokensAndVote (uint256 _projectVotedForId) public payable activatePendingTokens_ {
   uint256 tokens = buyTokens(msg.sender);
   investorList.addInvestor(msg.sender);//test that this is called

   address projAddr = projectAddrs[_projectVotedForId];
   Project(projAddr).vote(msg.sender, tokens);//test that this is called
   considerTentativeLeaderShip(_projectVotedForId);
   attemptProjectActivation();
 }

 function considerTentativeLeaderShip (uint256 _projectId) public {
   address projectAddr = projectAddrs[_projectId];

   if (
     tentativeLeaderAddr == address(0) ||
     Project(projectAddr).totalVotes_ > tentativeLeaderVotes ||
     tentativeLeaderClosingTime < now
     )
   {
     updateTentativeLeader(projectAddr);
   }

   recordCheck(projectAddr);

   if (projectsChecked.totalChecked == projectCount){
     tentativeLeaderConfirmed = true;
   }
 }

 function recordCheck (address projectAddr) internal {
   bool hasBeenChecked = projectsChecked.isChecked[projectAddr];

   if (!hasBeenChecked){
    projectsChecked.totalChecked = projectsChecked.totalChecked.add(1);
    projectsChecked.isChecked[projectAddr] = true;
   }
 }

 function updateTentativeLeader (address newLeaderAddr) internal {
   Project memory newLeader = Project(newLeaderAddr);
   tentativeLeaderConfirmed = tentativeLeaderConfirmed && tentativeLeaderClosingTime > now;

   if (!tentativeLeaderConfirmed) {
     resetProjectsChecked();
   }

   tentativeLeaderAddr = newLeaderAddr;
   tentativeLeaderVotes = newLeader.totalVotes_();
   tentativeLeaderClosingTime = newLeader.closingTime_();
   tentativeLeaderCapRequired = newLeader.capitalRequired_();

 }

 function resetProjectsChecked() internal {
   ProjectsChecked memory newProjectsChecked;
   projectsChecked = newProjectsChecked;
   recordCheck(tentativeLeaderAddr);
 }

 function attemptProjectActivation () public {
   if (
     tentativeLeaderCapRequired >= weiRaised &&
     tentativeLeaderConfirmed &&
     tentativeLeaderClosingTime > now
     ) {
     activateProject();
   }
 }

 address leadingProjectAddr;

 mapping(address => uint256) lastActivationPoints;
 uint256 totalActivationPoints;
 uint256 private activationMultiplier = 10e18;

 function pendingActivations(address account) internal {
   uint256 pendingActivationPoints = totalActivationPoints.sub(lastActivationPoints[account]);
   uint256 inactiveAccountTokens = Token(token).inactiveBalanceOf(account);
   return inactiveAccountTokens.mul(pendingActivationPoints).div(activationMultiplier);
 }

 modifier distributePendingDividends() {
   require(Dividends(dividendWallet).grantDividend(msg.sender));
   _;
 }

 //before this, we need to make sure that any pending dividends are distributed to the account. we need to do this to the correct dividend amount is distributed
 function activateTokens (address account) external distributePendingDividends returns (bool) {
   uint256 tokens = pendingActivations(account);
   Token(token).activate(investor, tokensToActivate);
   lastActivationPoints[account] = totalActivationPoints;
   return true;
 }

 function activateProject () public {
   uint256 totalInactive = Token(token).totalInactiveSupply();

   Project project = Project(tentativeLeaderAddr);
   uint526 projectTokens = project.developerTokens().add(project.investorTokens());

   uint256 newActivationPoints = projectTokens.mul(tokenMultiplier).div(totalInactive);
   totalActivationPoints = totalDividendPoints.add(newActivationPoints);
   project.activate();
 }

 function transferVotes (uint256 fromProjectId, uint256 toProjectId, uint256 votes) external {
   address fromAddr = projectAddrs[fromProjectId];
   address toAddr = projectAddrs[toProjectId];
   Project(fromAddr).removeVotes(msg.sender, votes);//test that this is called
   Project(toAddr).vote(msg.sender, votes);//test that this is called
 }

 function addVoteCredit (uint256 fromProjectId, uint256 votes) external {
   addVoteCredit_(msg.sender, fromProjectId, votes);
 }

 function addVoteCreditTo (address to, uint256 fromProjectId, uint256 votes) external {
   Project memory project = Project(projectAddrs[fromProjectId]);
   require(!project.open() || project.active());
   addVoteCredit_(to, fromProjectId, votes);
 }

 function addVoteCredit_ (address account, uint256 fromProjectId, uint256 votes) internal {
   address projAddr = projectAddrs[fromProjectId];
   Project(projAddr).removeVotes(account, votes);//test that this is called
   investorList.addVoteCredit(account, votes);
 }

 function voteWithCredit (uint256 toProjectId, uint256 votes) external {
   address projAddr = projectAddrs[toProjectId];
   investorList.removeVoteCredit(msg.sender, votes);//test that this is called
   Project(projAddr).vote(msg.sender, votes);//test that this is called
 }

 function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
    doomsDay = doomsDay.add(_days.mul(1728000));
 }

  function forwardFunds (address _to, uint256 amount) internal {
    _to.transfer(amount);
  }
}

/* function getInfo(uint256 id) public view returns(address) {
    /* string, uint256, uint256, uint256, uint256, bool, uint256, uint256, address */
    /* address projectAddr = projectAddrs[id]; */
    /* return ( */
      /* return Project(projectAddr).dividendWallet(); */
      /* Project(projectAddr).name(),
      Project(projectAddr).valuation(),
      Project(projectAddr).capitalRequired(),
      Project(projectAddr).developerTokens(),
      Project(projectAddr).investorTokens(),
      Project(projectAddr).active(),
      Project(projectAddr).totalVotes(),
      /* Project(projectAddr).closingTime(), */
      /* projectAddr */
      /* ); */
    /* }  */
