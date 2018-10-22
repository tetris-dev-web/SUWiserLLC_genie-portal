pragma solidity 0.4.24;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import '../Project.sol';
import '../token/ERC20/GNIToken.sol';

contract GNITokenCrowdsale is TimedCrowdsale {
  using SafeMath for uint256;
  uint256 public totalValuation;

  constructor
      (
        uint256 _openingTime,
        uint256 _doomsDay,
        uint256 _rate,
        address _developer,
        GNIToken _token
      )
      public
      Crowdsale(_rate, _developer, _token)
      TimedCrowdsale(_openingTime, _doomsDay) {
          totalValuation = 0;
  }

  event LogVotes (
    address voter,
    uint256 projectId,
    uint256 amount
    );


  address[] public projects;

  function getInfo(uint256 id) public view returns(
    string, uint256, uint256, uint256, uint256, bool, uint256, uint256
    ) {
      address projectAddr = projects[id];
      return (
        Project(projectAddr).name(),
        Project(projectAddr).valuation(),
        Project(projectAddr).capitalRequired(),
        Project(projectAddr).developerTokens(),
        Project(projectAddr).investorTokens(),
        Project(projectAddr).active(),
        Project(projectAddr).voteCount(),
        Project(projectAddr).closingTime()
        );
      }

 function pitchProject(string _name, address _manager, uint capitalRequired, uint256 _valuation, string _lat, string _lng) public payable {
   (uint256 developerTokens, uint256 investorTokens) = tokensToIssue(_valuation, capitalRequired);

   GNIToken(inactiveToken_).mint(developer, developerTokens.add(investorTokens));
   totalValuation = totalValuation.add(_valuation);

     // Increase crowdsale duation by 90 days
   _extendDoomsDay(90);

    uint256 _id = projects.length;
    //the following line causes a migration error...
    address projectAddr = new Project(_id, _name, _manager, address(this), _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng);
    projects.push(projectAddr);
    Project(projectAddr).log();
 }

 function tokensToIssue (uint256 valuation, uint256 investorValue) private view returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);

   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 function buyTokensAndVote (uint256 _projectVotedForId) public payable {
   //add require statement that makes sure the projet isnt already active
   buyTokens(msg.sender);
   updateInvestor(_projectVotedForId);
   Project(projects[_projectVotedForId]).update(msg.value);
 }

 struct Investor {
   address addr;
   uint256 id;
   uint256 voteCredit;
   //maps from projectId to number of votes for that project
   mapping(uint256 => uint256) votes;
 }

 Investor[] public investors;
 mapping(address => uint256) internal investorIds;

 function updateInvestor (uint256 _projectId) private {
   if (investorIds[msg.sender] == 0) {
     Investor memory newInvestor;

     newInvestor.addr = msg.sender;

     uint256 id = investors.length;
     newInvestor.id = id;
     investorIds[msg.sender] = id;

     investors.push(newInvestor);
   }

   updateInvestorVotes(_projectId);
 }

 function updateInvestorVotes(uint256 _projectId) internal {
   investors[investorIds[msg.sender]].votes[_projectId] = investors[investorIds[msg.sender]].votes[_projectId].add(msg.value);
   emit LogVotes(msg.sender, _projectId, msg.value);
 }

 function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
    doomsDay = doomsDay.add(_days.mul(1728000));
 }

 function activateProject() public {
    (uint256 projectId, bool canActivate) = projectToActivateDetails();

    if(canActivate){
      Project project = Project(projects[projectId]);

      uint256 developerTokens = project.developerTokens_();
      GNIToken(inactiveToken_).burnFrom(developer, developerTokens);
      GNIToken(activeToken_).mint(developer, developerTokens);
      updateInvestors(project.investorTokens_(), projectId);

      forwardFunds(developer, project.capitalRequired_());
      project.activate();
    }
  }

  function projectToActivateDetails() private returns (uint256, bool) {
    uint256 leadingProjectId;
    bool candidateFound = false;

    for(uint256 i = 0; i < projects.length; i = i.add(1)) {
      if (Project(projects[i]).beats(projects[leadingProjectId])) {
        leadingProjectId = i;
        candidateFound = true;
      }
    }

    return (leadingProjectId, candidateFound && Project(projects[leadingProjectId]).capitalRequired_() <= weiRaised);
  }

  function updateInvestors (uint256 tokens, uint256 projectId) private {
    uint256 supply = GNIToken(inactiveToken_).totalSupply().sub(GNIToken(inactiveToken_).balanceOf(developer));
    uint256 activationDivisor = supply.div(tokens);

    for (uint256 i = 0; i <= investors.length; i = i.add(1)) {
      Investor storage investor = investors[i];

      uint256 tokensToActivate = GNIToken(inactiveToken_).balanceOf(investor.addr).div(activationDivisor);
      GNIToken(inactiveToken_).burnFrom(investor.addr, tokensToActivate);
      GNIToken(activeToken_).mint(investor.addr, tokensToActivate);

      uint256 voteCredit = investor.votes[projectId];
      investor.votes[projectId] = 0;
      investor.voteCredit = investor.voteCredit.add(voteCredit);
    }
  }

  function forwardFunds (address _to, uint256 amount) internal {
    _to.transfer(amount);
    weiRaised = weiRaised.sub(amount);
  }

  //we want this to be called on intervals
  function distributeDividends () external {
    //store the total amount of wei in a variable
    //iterate through each investor.
    //divide the total active tokens by the number of active investor tokens.
    //divide the total wei by the resulting number to find out how much to wei to transfer
    uint256 activeTokens = GNIToken(activeToken_).totalSupply();
    uint256 profits = address(this).balance.sub(weiRaised);

    for (uint256 i = 0; i <= investors.length; i = i.add(1)) {
      Investor storage investor = investors[i];
      grantDividend(investor.addr, activeTokens, profits);
    }

    grantDividend(developer, activeTokens, profits);
  }

  function grantDividend (address investor, uint256 activeTokens, uint256 profits) private {
    uint256 investorShare = activeTokens.div(GNIToken(activeToken_).balanceOf(investor));
    uint256 dividend = profits.div(investorShare);
    investor.transfer(dividend);
  }
}
