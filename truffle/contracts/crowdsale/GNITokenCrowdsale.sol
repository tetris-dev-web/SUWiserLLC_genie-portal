pragma solidity 0.4.24;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import '../token/Token.sol';
import '../Project.sol';

contract GNITokenCrowdsale is TimedCrowdsale {
  using SafeMath for uint256;
  uint256 public totalValuation;
  address public _developer;


  constructor
      (
        uint256 _openingTime,
        uint256 _doomsDay,
        uint256 _rate,
        address _wallet,
        address _developerxw
      )
      public
      Crowdsale(_rate, _wallet)
      TimedCrowdsale(_openingTime, _doomsDay) {
          totalValuation = 0;
  }

  event LogVotes (
    address voter,
    uint256 projectId,
    uint256 amount
    );

  function addToProfits (uint256 amount) returns (uint256) {
    profits = profits.add(amount);
    return profits;
  }

  address[] public projects;

//modify this function to look up by investor id
 /* function votesByProjectandAddress(address _investor, uint256 _projectId) public returns (uint256) {
   uint256 result = votes[_investor][_projectId];
   return result;
 } */

 function pitchProject(string _name, address _manager, uint capitalRequired, uint256 _valuation, string _lat, string _lng) public payable {
   (uint256 developerTokens, uint256 investorTokens) = tokensToIssue(_valuation, capitalRequired);

   GNIToken(inactiveToken_).mint(developer, developerTokens.add(investorTokens));
   totalValuation = totalValuation.add(_valuation);

     // Increase crowdsale duation by 90 days
   _extendDoomsDay(90);

    uint256 _id = projects.length;
    address project = new Project(_id, _name, _manager, this, now + 86600 * 240, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng, 0, false);
    projects.push(project);
    Project(project).log();
 }

 function tokensToIssue (uint256 valuation, uint256 investorValue) private returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);

   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 function buyTokensAndVote (uint256 _projectVotedForId) public payable {
   //add require statement that makes sure the projet isnt already active
   buyTokens(msg.sender);
   updateInvestor();
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

 function updateInvestor () private {
   if (investorIds[msg.sender] == 0) {
     Investor storage newInvestor;

     newInvestor.addr = msg.sender;

     uint256 id = investors.length;
     newInvestor.id = id;
     investorIds[msg.sender] = id;

     investors.push(newInvestor);
   }

   updadateInvestorVotes();
 }

 function updateInvestorVotes(uint256 _projectId) internal {
   votes[msg.sender][_projectId] = votes[msg.sender][_projectId].add(msg.value);
   emit LogVotes(msg.sender, _projectId, msg.value);
 }

  function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
    doomsDay = doomsDay.add(_days.mul(1728000));
  }

  function activateProject() public {
    (uint256 projectId, bool canActivate) = projectToActivateDetails();

    if(canActivate){
      Project project = Project(projects[projectId]);

      GNIToken(inactiveToken_).burnFrom(developer, _amount);
      GNIToken(activeToken_).mint(developer, _amount);
      updateInvestors(project.investorTokens_());

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

      uint256 tokensToActivate = GNIToken(inactiveToken_).balanceOf(investor).div(activationDivisor);
      GNIToken(inactiveToken_).burnFrom(_investor, _amount);
      GNIToken(activeToken_).mint(_investor, _amount);

      uint256 voteCredit = investor.votes[projectId];
      investor.votes[projectId] = 0;
      investor.voteCredit = investor.voteCredut.add(voteCredit);
    }
  }

  function forwardFunds (address _to, uint256 amount) internal {
    _to.transfer(amount);
    weiRaised = weiRaised.sub(amount);
  }

  function distributeDividends () external onlyDeveloper {
    //store the total amount of wei in a variable
    //iterate through each investor.
    //divide the total active tokens by the number of active investor tokens.
    //divide the total wei by the resulting number to find out how much to wei to transfer
    uint256 activeTokens = GNIToken(activeToken_).totalSupply_();
    uint256 profits = this.balance.sub(weiRaised);

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





/* function updateProjectVotedFor(uint256 _projectId) {
  updateVoteCount(_projectId);
  extendProjectClosingTime(_projectId);
} */
/* Project storage _projectVotedFor = projects[_projectId]; */

/* function updateVoteCount(uint256 _projectId) internal {
uint256 count = Project(projects[_projectId]).voteCount();
Project(projects[_projectId]).voteCount() = count.add(msg.value);
}

function extendProjectClosingTime(uint256 _projectId) internal {
uint256 time = Project(projects[_projectId]).closingTime();
Project(projects[_projectId]).closingTime() = time.add(43200);
} */
