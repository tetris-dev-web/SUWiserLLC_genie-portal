pragma solidity >=0.4.22 <0.6.0;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import '../Project.sol';
import '../ProjectStub.sol';
import '../token/ERC20/Token.sol';
import '../Reimbursements.sol';
import '../ProjectLeaderTracker.sol';
import '../Voting.sol';


contract GNITokenCrowdsale is TimedCrowdsale {
  using SafeMath for uint256;
  /* using ECRecovery for bytes32; */
  /* InvestorList public investorList; */
  ProjectLeaderTracker public projectLeaderTracker;
  Voting public voting;
  address  public dividendWallet;

  constructor
      (
        uint256 _openingTime,
        uint256 _doomsDay,
        uint256 _rate,
        address  _developer,
        address  _dividendWallet,
        Token _token,
        /* InvestorList _investorList, */
        ProjectLeaderTracker _projectLeaderTracker,
        address  _reimbursements,
        Voting _voting
      )
      public
      Crowdsale(_rate, _developer, _token)
      TimedCrowdsale(_openingTime, _doomsDay, _reimbursements) {
        /* investorList = InvestorList(_investorList); */
        voting = _voting;
        projectLeaderTracker = ProjectLeaderTracker(_projectLeaderTracker);
        dividendWallet = _dividendWallet;
  }

  event ProjectPitch (
    address projectAddress,
    address developer,
    string  title,
    string  lat,
    string  lng,
    uint256 capitalRequired,
    uint256 valuation,
    uint256 developerTokens,
    uint256 investorTokens,
    uint256 totalProjectCount
  );

  /* mapping(address => bytes32) public voteHash;
  mapping(address => bytes32) public removeVoteHash; */

  mapping(uint256 => address ) internal projectAddress;
  uint256 internal totalProjectCount;

  function totalProjectCount_() public view returns (uint256) {
    return totalProjectCount;
  }

  function projectById (uint256 id) public view returns (address ) {
    return projectAddress[id];
  }

  function pitchProject(string memory _title, uint256 capitalRequired, uint256 _valuation, string memory _lat, string memory _lng, bytes32 _voteForHash, bytes32 _voteAgainstHash) public returns (address ) {//should only be callable by developer. may need more tests
   _extendDoomsDay(90);
    return _pitchProject(_title, capitalRequired, _valuation, _lat, _lng, _voteForHash, _voteAgainstHash);
  }

  function _pitchProject(string memory _title, uint256 capitalRequired, uint256 _valuation, string memory _lat, string memory _lng, bytes32 _voteForHash, bytes32 _voteAgainstHash) internal returns (address ) {//should only be callable by developer. may need more tests
   (uint256 developerTokens, uint256 investorTokens) = tokensToMint(_valuation, capitalRequired);

   Token(token).mint(developer, developerTokens);
   Token(token).mint(this, investorTokens);

    address  projectAddr = address(new Project(_title, developer, dividendWallet, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng));
    projectLeaderTracker.handleProjectPitch();
    totalProjectCount = totalProjectCount.add(1);
    projectAddress[totalProjectCount] = projectAddr;
    Project(projectAddr).transferOwnership(developer);
    /* Project proj = Project(projectAddr); */

    emit ProjectPitch(projectAddr, developer, _title, _lat, _lng, capitalRequired, _valuation, developerTokens, investorTokens, totalProjectCount);
    return projectAddr;
  }

 function tokensToMint (uint256 valuation, uint256 investorValue) private view returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);
   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 //before this, we need to execute any pending token activations with the modifier above for the sender account. We need to do this so that the correct number of tokens are activated
 function buyTokens () public payable { //tests need to be removed/added to account for new functionality. we also may just put all the logic for the super function in here.
   Token(token).activatePending(msg.sender);

   super.buyTokens(msg.sender);
   _extendDoomsDay(90);
  }

  event ProjectActivation (
    address addr,
    uint256 capitalRequired,
    uint256 time
  );


 function activateProject () public { //we need more tests for added functionality
   (
     address  tentativeLeaderAddr,
     bool tentativeLeaderConfirmed
   ) = projectLeaderTracker.tentativeLeader();

   Project project = Project(projectById(1));
   uint256 capitalRequired = project.capitalRequired_();
   if (
     tentativeLeaderConfirmed &&
     capitalRequired <= weiRaised &&
     project.open()
     ) {
     uint256 time = project.activate();
     //set the number of project votes to 0. */

     developer.transfer(capitalRequired);
     weiRaised = weiRaised.sub(capitalRequired);

     projectLeaderTracker.handleProjectActivation();
     Token(token).increasePendingActivations(project.developerTokens_().add(project.investorTokens_()));
     emit ProjectActivation(tentativeLeaderAddr, capitalRequired, time);
    }
  }

 function reimburseFunds () public {
   require(hasClosed());
   Reimbursements(reimbursements).recordReimbursement.value(weiRaised)();
   weiRaised = 0;
   Token(token).resetInactiveTokenCycle(developer);
   projectLeaderTracker.reset();
 }

//we need to see if it creates a different hash every time...if the hash is exposed to the frontend it is not secure and anyone can use it to sign this transaction
/* function voteForProject(address _project, address _voter, uint256 votes, bytes _signedMessage) public {
  require(Token(token).existingAccount(_voter));

  Project(_project).vote(_voter, votes, _signedMessage);
  Token(token).assign(_voter, votes);
  _extendDoomsDay(6);//this can be called externally
  updateProjects(_project);
}

function voteAgainstProject(address _project, address _voter, uint256 votes, bytes _signedMessage) public {
  Project(_project).voteAgainst(_voter, votes, _signedMessage);
  handleVoteRemoval(_voter, _project, votes);
}

 //this is for adding vote credit for each investor from the frontend after a project has been activated
 //call this function removeVotesFromIneligibleProject
 function removeVotesFromProject (address account, address fromProjectAddr) external {
   uint256 votes = Project(fromProjectAddr).votesOf(account);
   Project(fromProjectAddr).removeVotes(account, votes);
   handleVoteRemoval(account, fromProjectAddr, votes);
 }

 function handleVoteRemoval (address account, address fromProjectAddr, uint256 votes) internal {
   Token(token).freeUp(account, votes);
   doomsDay = doomsDay.sub(43200);
   updateProjects(fromProjectAddr);
} */

 //we will test this separately
 /* function authenticateVoter(bytes _signedMessage, address voter, bytes32 unsignedMessage) internal {
   address recoveredVoter = unsignedMessage.recover(_signedMessage);
   require(recoveredVoter == voter);
   /* require(investorList.validAccount(voter));//token.existingAccount */
 /* }  */

 /* function updateProjects (address votedForProj) internal {
   projectLeaderTracker.trackProject(votedForProj);
   /* activateProject(); */
 /* }  */

 //tests need to be updated

 function extendDoomsDay (uint256 _days) external {
   require(msg.sender == address(Voting(voting)));
   _extendDoomsDay(_days);
 }

 function _extendDoomsDay(uint256 _days) internal canExtendDoomsDay {
    uint256 newDoomsDay = now.add(_days.mul(1728000));
    if (newDoomsDay > doomsDay) {
      doomsDay = newDoomsDay;
      canReOpen = false;
    }
 }

 function reduceDoomsDay (uint256 _days) public canExtendDoomsDay {
   require(msg.sender == address(Voting(voting)));
   doomsDay = doomsDay.sub(_days.mul(1728000));
 }
  /* function forwardFunds (address _to, uint256 amount) internal {
    _to.transfer(amount);
  } */
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

    /* event VoteAddition (
      uint256 voteAdditions,
      uint256 num
    );


    event VoteRemoval (
      uint256 voteRemovals
    );

    uint256 voteAdditions;
    uint256 voteRemovals; */
