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

  event ProjectPitch (
    address projectAddress,
    address developer,
    string name,
    string lat,
    string lng,
    uint256 capitalRequired,
    uint256 valuation,
    uint256 developerTokens,
    uint256 investorTokens,
    uint256 totalProjectCount
  );

  mapping(uint256 => address) internal projectAddress;
  uint256 public totalProjectCount;

  function projectById (uint256 id) returns (address) {
    return projectAddress[id];
  }

  function pitchProject(string _name, uint256 capitalRequired, uint256 _valuation, string _lat, string _lng) public {//we need more tests for this
   (uint256 developerTokens, uint256 investorTokens) = tokensToMint(_valuation, capitalRequired);

   Token(token).mint(developer, developerTokens);
   Token(token).mint(this, investorTokens);

   totalValuation = totalValuation.add(_valuation);

   _extendDoomsDay(90);

    address projectAddr = new Project(_name, developer, dividendWallet, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng);
    projectLeaderBoard.incrementCandidateCount();
    totalProjectCount = totalProjectCount.add(1);
    projectAddress[totalProjectCount] = projectAddr;
    emit ProjectPitch(projectAddr, developer, _name, _lat, _lng, capitalRequired, _valuation, developerTokens, investorTokens, totalProjectCount);
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

 function activateProject () internal { //we need more tests for added functionality
   (
     address tentativeLeaderAddr,
     uint256 tentativeLeaderCapRequired,
     bool canActivate
   ) = projectLeaderBoard.tentativeLeader();

   if (canActivate) {
     Project project = Project(tentativeLeaderAddr);
     project.activate();
     project.log();
     //reduce cast vote count by the number of project votes, set the number of project votes to 0.

     forwardFunds(developer, tentativeLeaderCapRequired);
     weiRaised = weiRaised.sub(tentativeLeaderCapRequired);

     projectLeaderBoard.handleProjectActivation();
     Token(token).increasePendingActivations(project.developerTokens_().add(project.investorTokens_()));
   }
 }

 function reimburseFunds () public { //we need tests for this
   require(hasClosed());
   reimbursements.transfer(weiRaised);
   weiRaised = 0;
   Token(token).resetInactiveTokenCycle();
 }

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

   updateProjects(fromProjectAddr);
 }

 function voteWithCredit (address toProjectAddr, uint256 votes) external {
   investorList.removeVoteCredit(msg.sender, votes);

   Project project = Project(toProjectAddr);
   project.vote(msg.sender, votes);
   totalVotesCast = totalVotesCast.add(votes);

   updateProjects(toProjectAddr);
 }

 function updateProjects (address votedForProj) internal {
   projectLeaderBoard.considerTentativeLeaderShip(votedForProj);
   activateProject();
 }

 function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
    doomsDay = doomsDay.add(_days.mul(1728000));
 }

  function forwardFunds (address _to, uint256 amount) internal {
    _to.transfer(amount);
  }
}

/* function transferVotes (address fromProjectAddr, address toProjectAddr, uint256 votes) external {
  Project fromProj = Project(fromProjectAddr);
  Project toProj = Project(toProjectAddr);

  fromProj.removeVotes(msg.sender, votes);
  toProj.vote(msg.sender, votes);

  fromProj.log();
  toProj.log();
} */

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
