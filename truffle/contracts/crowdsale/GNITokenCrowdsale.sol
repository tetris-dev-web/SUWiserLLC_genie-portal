pragma solidity 0.4.25;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
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

  address[] public projects;

  function getInfo(uint256 id) public view returns(
    string, uint256, uint256, uint256, uint256, bool, uint256, uint256, address
    ) {
      address projectAddr = projects[id];
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
      }

//after this, the developer has to approve this contract to spend the amount of inactive tokens associated with developers on its behalf
 function pitchProject(string _name, uint256 capitalRequired, uint256 _valuation, string _lat, string _lng) public payable {
   (uint256 developerTokens, uint256 investorTokens) = tokensToMint(_valuation, capitalRequired);

   Token(token).mint(developer, developerTokens);
   Token(token).mint(this, investorTokens);

   totalValuation = totalValuation.add(_valuation);

     // Increase crowdsale duation by 90 days
   _extendDoomsDay(90);

    uint256 _id = projects.length;
    address projectAddr = new Project(_id, _name, developer, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng);
    projects.push(projectAddr);
    Project(projectAddr).log();
 }

 function tokensToMint (uint256 valuation, uint256 investorValue) private view returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);

   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 function buyTokensAndVote (uint256 _projectVotedForId) public payable {
   uint256 tokens = buyTokens(msg.sender);
   investorList.addInvestor(msg.sender);
   Project(projects[_projectVotedForId]).vote(msg.sender, tokens);
 }

 /* function sellTokens (address to, uint256 tokens) external {
   Token(token).transferActiveTokens(msg.sender, to, tokens);
   investorList.removeVoteCredit(msg.sender, tokens);
   investorList.addVoteCredit(to, tokens);
 } */

 function transferVotes (uint256 fromProjectId, uint256 toProjectId, uint256 votes) external {
   Project(projects[fromProjectId]).removeVotes(msg.sender, votes);
   Project(projects[toProjectId]).vote(msg.sender, votes);
 }

 function addVoteCredit (uint256 fromProjectId, uint256 votes) external {
   Project(projects[fromProjectId]).removeVotes(msg.sender, votes);
   investorList.addVoteCredit(msg.sender, votes);
 }

 function voteWithCredit (uint256 toProjectId, uint256 votes) external {
   investorList.removeVoteCredit(msg.sender, votes);
   Project(projects[toProjectId]).vote(msg.sender, votes);
 }

 function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
    doomsDay = doomsDay.add(_days.mul(1728000));
 }

 function activateProject() public {
    (uint256 projectId, bool canActivate) = projectToActivateDetails();

    if(canActivate){
      Project project = Project(projects[projectId]);

      uint256 developerTokens = project.developerTokens_();

      Token(token).activate(developer, developerTokens);

      updateInvestors(project.investorTokens_(), projectId);

      uint256 capital = project.capitalRequired_();

      forwardFunds(developer, capital);
      weiRaised = weiRaised.sub(capital);

      project.activate();
    }
  }

  function projectToActivateDetails() private view returns (uint256, bool) {
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
    uint256 supply = Token(token).totalInactiveSupply().sub(Token(token).inactiveBalanceOf(developer));

    for (uint256 i = 1; i <= investorList.investorCount(); i = i.add(1)) {
      address investor = investorList.addrById(i);
      uint256 investorBalance = Token(token).inactiveBalanceOf(investor);
      uint256 tokensToActivate = investorBalance.mul(tokens).div(supply);

      Token(token).activate(investor, tokensToActivate);

      /* investorList.cacheVoteCredit(investor, projectId, tokensToActivate); */
      Project(projects[projectId]).removeVotes(investor, tokensToActivate);
      investorList.addVoteCredit(investor, tokensToActivate);
    }
  }

  function forwardFunds (address _to, uint256 amount) internal {
    _to.transfer(amount);
    weiRaised = weiRaised.sub(amount);
  }
}
