pragma solidity ^0.4.24;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import '../Project.sol';
import '../ProjectStub.sol';
import '../token/ERC20/Token.sol';
import '../InvestorList.sol';
import '../Reimbursements.sol';


contract GNITokenCrowdsale is TimedCrowdsale {
  using SafeMath for uint256;
  uint256 public totalValuation;
  InvestorList public investorList;
  address public dividendWallet;
  address public reimbursements;

  constructor
      (
        uint256 _openingTime,
        uint256 _doomsDay,
        uint256 _rate,
        address _developer,
        address _dividendWallet,
        Token _token,
        InvestorList _investorList,
        address _reimbursements
      )
      public
      Crowdsale(_rate, _developer, _token)
      TimedCrowdsale(_openingTime, _doomsDay) {
        investorList = InvestorList(_investorList);
        totalValuation = 0;
        dividendWallet = _dividendWallet;
        reimbursements = _reimbursements;
  }

  address[] public projectAddrs;
  uint256 public inactiveProjectCount;

  event NewProject (
      uint id,
      string name,
      uint256 valuation,
      uint256 capitalRequired,
      uint256 developerTokens,
      uint256 investorTokens,
      string lat,
      string lng
  );

  function pitchProject(string _name, uint256 capitalRequired, uint256 _valuation, string _lat, string _lng) public {//we need more tests for this
   (uint256 developerTokens, uint256 investorTokens) = tokensToMint(_valuation, capitalRequired);

   Token(token).mint(developer, developerTokens);
   Token(token).mint(this, investorTokens);

   totalValuation = totalValuation.add(_valuation);

   _extendDoomsDay(90);

    uint256 _id = inactiveProjectCount;
    address projectAddr = new Project(_id, _name, developer, dividendWallet, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng);
    projectAddrs.push(projectAddr);
    inactiveProjectCount = inactiveProjectCount.add(1);
    emit NewProject(_id, _name, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng);
  }

 function tokensToMint (uint256 valuation, uint256 investorValue) private view returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);
   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 //before this, we need to execute any pending token activations with the modifier above for the sender account. We need to do this so that the correct number of tokens are activated
 function buyTokensAndVote (uint256 _projectVotedForId) public payable {//we need more tests for this
   Token(token).activatePending(msg.sender);

   uint256 tokens = buyTokens(msg.sender);
   investorList.addInvestor(msg.sender);

   address projAddr = projectAddrs[_projectVotedForId];
   Project(projAddr).vote(msg.sender, tokens);

   _extendDoomsDay(90);

   updateProjects(_projectVotedForId);
  }

 address public tentativeLeaderAddr;
 uint256 public tentativeLeaderCapRequired;
 bool public tentativeLeaderConfirmed;

 struct ProjectsChecked {
   mapping(address => bool) isChecked;
   uint256 totalChecked;
 }

 uint256 internal currentCheckCycle;
 mapping(uint256 => ProjectsChecked) internal checkCycle;

 function considerTentativeLeaderShip (uint256 _projectId) public {
   address projectAddr = projectAddrs[_projectId];

   require(Project(projectAddr).open() && !Project(projectAddr).active());

   if (
     tentativeLeaderAddr == address(0) ||
     Project(projectAddr).totalVotes_() > Project(tentativeLeaderAddr).totalVotes_() ||
     !Project(tentativeLeaderAddr).open()
     )
   {
     updateTentativeLeader(projectAddr);
   }

   recordCheck(projectAddr);

   if (checkCycle[currentCheckCycle].totalChecked == inactiveProjectCount){
     tentativeLeaderConfirmed = true;
   }
 }

 function recordCheck (address projectAddr) internal {
   bool hasBeenChecked = checkCycle[currentCheckCycle].isChecked[projectAddr];

   if (!hasBeenChecked) {
    checkCycle[currentCheckCycle].totalChecked = checkCycle[currentCheckCycle].totalChecked.add(1);
    checkCycle[currentCheckCycle].isChecked[projectAddr] = true;
   }
 }

 function updateTentativeLeader (address newLeaderAddr) internal {
   //if its overtaking a project that is open, that means it has more votes and we dont need to reset all the checks
   if (tentativeLeaderAddr != address(0) && !Project(tentativeLeaderAddr).open()) {
     resetProjectsChecked();
   }
   setTentativeLeader(newLeaderAddr);
 }

 function resetProjectsChecked() internal {
   ProjectsChecked memory newProjectsChecked;
   currentCheckCycle = currentCheckCycle.add(1);
   checkCycle[currentCheckCycle] = newProjectsChecked;
   inactiveProjectCount = inactiveProjectCount.sub(1);
 }

 function setTentativeLeader(address newLeaderAddr) internal {
   Project newLeader = Project(newLeaderAddr);

   tentativeLeaderAddr = newLeaderAddr;
   tentativeLeaderCapRequired = newLeader.capitalRequired_();
   tentativeLeaderConfirmed = false;
 }

 function attemptProjectActivation () public {
   if (
     tentativeLeaderCapRequired <= weiRaised &&
     tentativeLeaderConfirmed &&
     Project(tentativeLeaderAddr).open()
     ) {
     activateProject();
   }
 }

 function activateProject () internal {
   Project project = Project(tentativeLeaderAddr);
   project.activate();

   forwardFunds(developer, tentativeLeaderCapRequired);
   weiRaised = weiRaised.sub(tentativeLeaderCapRequired);
   inactiveProjectCount = inactiveProjectCount.sub(1);
   Token(token).increasePendingActivations(project.developerTokens_().add(project.investorTokens_()));

 }

 function reimburseFunds () public {
   require(hasClosed());
   reimbursements.transfer(weiRaised);
   weiRaised = 0;
 }

 function transferVotes (uint256 fromProjectId, uint256 toProjectId, uint256 votes) external {
   address fromAddr = projectAddrs[fromProjectId];
   address toAddr = projectAddrs[toProjectId];

   Project(fromAddr).removeVotes(msg.sender, votes);
   Project(toAddr).vote(msg.sender, votes);

   logVoteChange(fromAddr, fromProjectId);
   logVoteChange(toAddr, toProjectId);
 }

 function addVoteCredit (uint256 fromProjectId, uint256 votes) external {
   addVoteCredit_(msg.sender, fromProjectId, votes);
 }

 //this is for adding vote credit for each investor from the frontend after a project has been activated
 function addVoteCreditTo (address account, uint256 fromProjectId) external {
   Project project = Project(projectAddrs[fromProjectId]);
   require(!project.open() || project.active_());
   uint256 votes = project.votesOf(account);
   addVoteCredit_(account, fromProjectId, votes);
 }

 function addVoteCredit_ (address account, uint256 fromProjectId, uint256 votes) internal {
   address projAddr = projectAddrs[fromProjectId];
   Project(projAddr).removeVotes(account, votes);
   investorList.addVoteCredit(account, votes);
   logVoteChange(projAddr, fromProjectId);
 }

 function voteWithCredit (uint256 toProjectId, uint256 votes) external {
   address projAddr = projectAddrs[toProjectId];
   investorList.removeVoteCredit(msg.sender, votes);
   Project(projAddr).vote(msg.sender, votes);
   logVoteChange(projAddr, toProjectId);
 }

 event VoteChange (
   uint256 id,
   uint256 voteCount
);

 function logVoteChange (address projectAddr, uint256 projectId) private {
   Project project = Project(projectAddr);
   emit VoteChange(projectId, project.totalVotes_());
 }

 function updateProjects (uint256 _projectId) internal {
   considerTentativeLeaderShip(_projectId);
   attemptProjectActivation();
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
