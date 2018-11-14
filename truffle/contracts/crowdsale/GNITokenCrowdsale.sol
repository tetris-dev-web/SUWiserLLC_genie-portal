pragma solidity 0.4.25;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import './ProjectQueue.sol';
import '../Project.sol';
import '../token/ERC20/Token.sol';
import '../InvestorList.sol';

contract GNITokenCrowdsale is TimedCrowdsale {
  using SafeMath for uint256;
  uint256 public totalValuation;
  InvestorList private investorList;

  constructor
      (
        uint256 _openingTime,
        uint256 _doomsDay,
        uint256 _rate,
        address _developer,
        Token _token,
        InvestorList _investorList
      )
      public
      Crowdsale(_rate, _developer, _token)
      TimedCrowdsale(_openingTime, _doomsDay) {
        investorList = InvestorList(_investorList);
        totalValuation = 0;
  }

  address[] public projectAddrs;
/*
  function getInfo(uint256 id) public view returns(
    string, uint256, uint256, uint256, uint256, bool, uint256, uint256, address
    ) {
      address projectAddr = projectAddrs[id];
      return (
        Project(projectAddr).name(),
        Project(projectAddr).valuation(),
        Project(projectAddr).capitalRequired(),
        Project(projectAddr).developerTokens(),
        Project(projectAddr).investorTokens(),
        Project(projectAddr).active(),
        Project(projectAddr).totalVotes(),
        Project(projectAddr).closingTime(),
        projectAddr
        );
      } */

//after this, the developer has to approve this contract to spend the amount of inactive tokens associated with developers on its behalf
 function pitchProject(string _name, uint256 capitalRequired, uint256 _valuation, string _lat, string _lng) public payable {
   (uint256 developerTokens, uint256 investorTokens) = tokensToMint(_valuation, capitalRequired);

   Token(token).mint(developer, developerTokens);//test if this is called
   Token(token).mint(this, investorTokens);//test if this is called

   totalValuation = totalValuation.add(_valuation);

     // Increase crowdsale duation by 90 days
   _extendDoomsDay(90);

    uint256 _id = projectAddrs.length;
    address projectAddr = new Project(_id, _name, developer, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng);
    projectAddrs.push(projectAddr);
    projectQueue.enqueue(projectAddr);//we want to test if this is called
    Project(projectAddr).log();
 }

 function tokensToMint (uint256 valuation, uint256 investorValue) private view returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);
   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 function buyTokensAndVote (uint256 _projectVotedForId) public payable {
   uint256 tokens = buyTokens(msg.sender);
   investorList.addInvestor(msg.sender);//test that this is called

   address projAddr = projectAddrs[_projectVotedForId];
   Project(projAddr).vote(msg.sender, tokens);//test that this is called

   updateProjectQueue(projAddr);
   tryActivateProject();
 }

 /* function sellTokens (address to, uint256 tokens) external {
   Token(token).transferActiveTokens(msg.sender, to, tokens);
   investorList.removeVoteCredit(msg.sender, tokens);
   investorList.addVoteCredit(to, tokens);
 } */

 function transferVotes (uint256 fromProjectId, uint256 toProjectId, uint256 votes) external {
   address fromAddr = projectAddrs[fromProjectId];
   address toAddr = projectAddrs[toProjectId];
   Project(fromAddr).removeVotes(msg.sender, votes);//test that this is called
   Project(toAddr).vote(msg.sender, votes);//test that this is called

   updateProjectQueue(fromAddr);
   updateProjectQueue(toAddr);
   tryActivateProject();
 }

 function addVoteCredit (uint256 fromProjectId, uint256 votes) external {
   address projAddr = projectAddrs[fromProjectId];
   Project(projAddr).removeVotes(msg.sender, votes);//test that this is called
   investorList.addVoteCredit(msg.sender, votes);//test that this is called

   updateProjectQueue(projAddr);
   tryActivateProject();
 }

 function voteWithCredit (uint256 toProjectId, uint256 votes) external {
   address projAddr = projectAddrs[toProjectId];
   investorList.removeVoteCredit(msg.sender, votes);//test that this is called
   Project(projAddr).vote(msg.sender, votes);//test that this is called

   updateProjectQueue(projAddr);
   tryActivateProject();
 }

 function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
    doomsDay = doomsDay.add(_days.mul(1728000));
 }

 function updateProjectQueue (address projectAddress) internal {
   projectQueue.heapify(projectAddress);
 }

 function tryActivateProject () internal {
   Project leadingProject = Project(projectQueue.leadingProjectAddr());//in stub, we return an address
   bool stillOpen = leadingProject.open_(); //we set up an open status in the stub
   uint256 capitalRequired = leadingProject.capitalRequired_(); //we return a capital amount

   if (capitalRequired <= weiRaised || !stillOpen) {
     projectQueue.dequeue();//check that this was called

     if (stillOpen) {
       uint256 developerTokens = project.developerTokens_();//return arbitrary amount in the stub
       uint256 investorTokens = project.investorTokens_();//return arbitrary amount in the stub

       Token(token).activate(developer, developerTokens);//test that this was called
       updateInvestors(investorTokens, projectId);

       forwardFunds(developer, capitalRequired);//test that the funds are transfered
       weiRaised = weiRaised.sub(capitalRequired);//test that the weiRaised decreases

       project.activate();//test that this is called
     }

     tryActivateProject();//test that this is called again
   }
 }

 /* function activateProject() public {
    (uint256 projectId, bool canActivate) = projectToActivateDetails();

    if(canActivate){
      Project project = Project(projectAddrs[projectId]);

      uint256 developerTokens = project.developerTokens_();

      Token(token).activate(developer, developerTokens);

      updateInvestors(project.investorTokens_(), projectId);

      uint256 capital = project.capitalRequired_();

      forwardFunds(developer, capital);
      weiRaised = weiRaised.sub(capital);

      project.activate();
    }
  } */

  //we need some functionality for granting vote credit for closed projectAddrs/removing votes from closed pro
  /* function projectToActivateDetails() private view returns (uint256, bool) {
    uint256 leadingProjectId;
    bool candidateFound = false;

    for(uint256 i = 0; i < projectAddrs.length; i = i.add(1)) {
      if (Project(projectAddrs[i]).beats(projectAddrs[leadingProjectId])) {
        leadingProjectId = i;
        candidateFound = true;
      }
    }

    return (leadingProjectId, candidateFound && Project(projectAddrs[leadingProjectId]).capitalRequired_() <= weiRaised);
  } */

  function updateInvestors (uint256 tokens, uint256 projectId) private {
    uint256 supply = Token(token).totalInactiveSupply().sub(Token(token).inactiveBalanceOf(developer));

    for (uint256 i = 1; i <= investorList.investorCount(); i = i.add(1)) {
      address investor = investorList.addrById(i);
      uint256 investorBalance = Token(token).inactiveBalanceOf(investor);

      uint256 tokensToActivate = investorBalance.mul(tokens).div(supply);
      Token(token).activate(investor, tokensToActivate);

      /* Project(projectAddrs[projectId]).removeVotes(investor, tokensToActivate); */ //not needed if theyre removed from the queue
      investorList.addVoteCredit(investor, tokensToActivate);
    }
  }

  function forwardFunds (address _to, uint256 amount) internal {
    _to.transfer(amount);
    weiRaised = weiRaised.sub(amount);
  }
}
