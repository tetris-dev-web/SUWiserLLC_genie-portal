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

  uint256 public inactiveProjectCount;

  function pitchProject(string _name, uint256 capitalRequired, uint256 _valuation, string _lat, string _lng) public {//we need more tests for this
   (uint256 developerTokens, uint256 investorTokens) = tokensToMint(_valuation, capitalRequired);

   Token(token).mint(developer, developerTokens);
   Token(token).mint(this, investorTokens);

   totalValuation = totalValuation.add(_valuation);

   _extendDoomsDay(90);

    address projectAddr = new Project(_name, developer, dividendWallet, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng);
    inactiveProjectCount = inactiveProjectCount.add(1);
    Project(projectAddr).log(); //needs to be made
    return projectAddr;
  }

 function tokensToMint (uint256 valuation, uint256 investorValue) private view returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);
   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 //before this, we need to execute any pending token activations with the modifier above for the sender account. We need to do this so that the correct number of tokens are activated
 function buyTokens () public payable { //tests need to be removed/added to account for new functionality. we also may just put all the logic for the super function in here.
   Token(token).activatePending(msg.sender);

   uint256 voteCredit = super.buyTokens(msg.sender);
   investorList.addInvestor(msg.sender);
   investorList.addVoteCredit(msg.sender, voteCredit);
   _extendDoomsDay(90);
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

 function considerTentativeLeaderShip (address projectAddr) public { //we need more tests for new functionality (when its implemented)
   require(Project(projectAddr).open() && !Project(projectAddr).active());

   if (
     tentativeLeaderAddr == address(0) ||
     Project(projectAddr).totalVotes_() > Project(tentativeLeaderAddr).totalVotes_() ||
     !Project(tentativeLeaderAddr).open()
     )
   {
     updateTentativeLeader(projectAddr);
   } else if (projectAddr == tentativeLeaderAddr) {
     //if it increased, we just increase the variable.
     //if votes decreased, we call updateTentativeLeader with address 0
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
   //these next two lines only runs if the address isnt addr(0)
   tentativeLeaderCapRequired = newLeader.capitalRequired_();
   //we also need to reset the tentative leader votes, either to a real amount or based on if there is a new leader
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

 function activateProject () internal { //we need more tests for added functionality
   Project project = Project(tentativeLeaderAddr);
   project.activate();
   project.log();
   //reduce cast vote count by the number of project votes, set the number of project votes to 0.

   forwardFunds(developer, tentativeLeaderCapRequired);
   weiRaised = weiRaised.sub(tentativeLeaderCapRequired);
   inactiveProjectCount = inactiveProjectCount.sub(1);
   Token(token).increasePendingActivations(project.developerTokens_().add(project.investorTokens_()));
 }

 function reimburseFunds () public { //we need tests for this
   require(hasClosed());
   reimbursements.transfer(weiRaised);
   weiRaised = 0;
   Token(token).resetInactiveTokenCycle();
 }

 /* function transferVotes (address fromProjectAddr, address toProjectAddr, uint256 votes) external {
   Project fromProj = Project(fromProjectAddr);
   Project toProj = Project(toProjectAddr);

   fromProj.removeVotes(msg.sender, votes);
   toProj.vote(msg.sender, votes);

   fromProj.log();
   toProj.log();
 } */
 uint256 public totalVotesCast;

//tests need to be modified for all voting functions
 function addVoteCredit (address fromProjectAddr, uint256 votes) external { //tests need to be modified
   addVoteCredit_(msg.sender, fromProjectAddr, votes);
 }

 //this is for adding vote credit for each investor from the frontend after a project has been activated
 function addVoteCreditTo (address account, address fromProjectAddr) external {
   Project project = Project(fromProjectAddr);
   require(!project.open() || project.active_());
   uint256 votes = project.votesOf(account);
   addVoteCredit_(account, fromProjectAddr, votes);
 }

 function addVoteCredit_ (address account, address fromProjectAddr, uint256 votes) internal {
   Project project = Project(fromProjectAddr);

   project.removeVotes(account, votes);
   totalVotesCast = totalVotesCast.sub(votes);
   investorList.addVoteCredit(account, votes);

   project.log();
   updateProjects(fromProjectAddr);
 }

 function voteWithCredit (address toProjectAddr, uint256 votes) external {
   investorList.removeVoteCredit(msg.sender, votes);

   Project project = Project(toProjectAddr);
   project.vote(msg.sender, votes);
   totalVotesCast = totalVotesCast.add(votes);

   project.log();
   updateProjects(toProjectAddr);
 }

 function updateProjects (address votedForProj) internal {
   considerTentativeLeaderShip(votedForProj);
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
