pragma solidity 0.4.24;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import '../token/Token.sol';
import '../Project.sol';

contract GNITokenCrowdsale is TimedCrowdsale {
  using SafeMath for uint256;
  uint256 public totalValuation;


  constructor
      (
        uint256 _openingTime,
        uint256 _doomsDay,
        uint256 _rate,
        address _wallet,
        Token _token
      )
      public
      Crowdsale(_rate, _wallet, _token)
      TimedCrowdsale(_openingTime, _doomsDay) {
          totalValuation = 0;
  }

  event LogVotes (
    address voter,
    uint256 projectId,
    uint256 amount
    );

  address[] public projects;

  //move this to projec class
 function getProjectInfo(uint id) public view returns(
     string, uint256, uint256, uint256, uint256, bool, uint256, uint256
     ) {
     address project = projects[id];
     return (
         Project(project).name(),
         Project(project).valuation(),
         Project(project).capitalRequired(),
         Project(project).developerTokens(),
         Project(project).investorTokens(),
         Project(project).active(),
         Project(project).voteCount(),
         Project(project).closingTime()
     );
 }

 //maps from address to projectIds. projectIds map to
 mapping(address => mapping(uint256 => uint256)) internal votes;

 function votesByProjectandAddress(address _investor, uint256 _projectId) public returns (uint256) {
   uint256 result = votes[_investor][_projectId];
   return result;
 }

 //should accept a manager address
 function pitchProject(string _name, address _manager, uint capitalRequired, uint256 _valuation, string _lat, string _lng) public payable {
   (uint256 developerTokens, uint256 investorTokens) = tokensToIssue(_valuation, capitalRequired);

   Token(token).genesis(developerTokens.add(investorTokens));

   totalValuation = totalValuation.add(_valuation);

     // Increase crowdsale duation by 90 days
   _extendDoomsDay(90);

    uint256 _id = projects.length;
    address project = new Project(_id, _name, _manager, now + 86600 * 240, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng, 0, false);
    projects.push(project);
    Project(project).log();
 }

 function tokensToIssue (uint256 valuation, uint256 investorValue) private returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);

   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 function handleTokenPurchase (uint256 _projectId) public payable {
   //add require statement that makes sure the projet isnt already active
   buyTokens(msg.sender);
   Project(projects[_projectId]).update(msg.value);
 }


 function updateAccountVotes(uint256 _projectId) internal {
   votes[msg.sender][_projectId] = votes[msg.sender][_projectId].add(msg.value);
   emit LogVotes(msg.sender, _projectId, msg.value);
 }


  function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
    doomsDay = doomsDay.add(_days.mul(1728000));
  }

  function projectToActivateDetails() public view returns (uint256, bool) {
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

  function activateProject() public {
    (uint256 projectId, bool canActivate) = projectToActivateDetails();

    if(canActivate){
      Project project = Project(projects[projectId]);

      Token(token).activateTokens(project.developerTokens_(), project.investorTokens_(), wallet);
      forwardFunds(project.capitalRequired_());
      project.activate();
    }
  }

  function forwardFunds (uint256 amount) internal {
    wallet.transfer(amount);
    weiRaised = weiRaised.sub(amount);
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
