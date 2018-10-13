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

  event LogProject (
      uint id,
      string name,
      uint256 valuation,
      uint256 capitalRequired,
      uint256 developerTokens,
      uint256 investorTokens,
      string lat,
      string lng,
      uint256 voteCount,
      bool active
  );

  event LogVotes (
    address voter,
    uint256 projectId,
    uint256 amount
    );


  /* mapping(string => Project) private projects; */
  Project[] public projects;

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

     uint id = projects.push(new Project(_name, _manager, now + 86600 * 240, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng, 0, false)) - 1;

     // log the creation of the new project
     emit LogProject(id, _name, _valuation, capitalRequired, developerTokens, investorTokens, _lat, _lng, 0, false);
 }

 function tokensToIssue (uint256 valuation, uint256 investorValue) private returns (uint256, uint256) {
   uint256 developerValue = valuation.sub(investorValue);

   return (developerValue.mul(rate), investorValue.mul(rate));
 }

 //sender is always the beneficiary
 //sender becomes this contract in BasicToken
 //funds from msg.value are allocated to this contract since this function is a payable.
 //later, we can assign funds to the wallet (which is the developer wallet). No second wallet is needed because the contract serves as an escrow wallet.
 function handleTokenPurchase (uint256 _projectId) public payable {
   //add require statement that makes sure the projet isnt already active
   buyTokens(msg.sender);
   //make these methods on the project class instead
   updateProjectVotedFor(_projectId);
   updateAccountVotes(_projectId);
 }

 function forwardFundsToDeveloper (uint256 amount) internal {
   wallet.transfer(amount);
 }

 function updateProjectVotedFor(uint256 _projectId) {
   updateVoteCount(_projectId);
   extendProjectClosingTime(_projectId);
 }

 function updateAccountVotes(uint256 _projectId) internal {
   votes[msg.sender][_projectId] = votes[msg.sender][_projectId].add(msg.value);
   emit LogVotes(msg.sender, _projectId, msg.value);
 }

   /* Project storage _projectVotedFor = projects[_projectId]; */

  function updateVoteCount(uint256 _projectId) internal {
    uint256 count = Project(projects[_projectId]).voteCount();
    Project(projects[_projectId]).voteCount() = count.add(msg.value);
  }

  function extendProjectClosingTime(uint256 _projectId) internal {
    uint256 time = Project(projects[_projectId]).closingTime();
    Project(projects[_projectId]).closingTime() = time.add(43200);
  }

  function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
    doomsDay = doomsDay.add(_days.mul(1728000));
  }

  function projectToActivateDetails() public view returns (uint256, bool) {
    uint256 leadingProjectId;
    bool candidateFound = false;

    for(uint256 i = 0; i < projects.length; i = i.add(1)) {

        if (!Project(projects[i]).active &&
            Project(projects[i]).voteCount > 0 &&
            Project(projects[i]).closingTime > now &&
            (Project(projects[i]).voteCount >= Project(projects[leadingProjectId]).voteCount || Project(projects[leadingProjectId]).active)
           )
        {
          leadingProjectId = i;
          candidateFound = true;
        }
    }

    return (leadingProjectId, candidateFound && projects[leadingProjectId].capitalRequired <= weiRaised);
  }

  //we can keep track of whether or not a project is activatable on the frontend. If so, this function will be called. No need to check for this on blockchain
    function activateProject() public {
      (uint256 projectId, bool canActivate) = projectToActivateDetails();

      if(canActivate){
        address project = projects[projectId];

        Token(token).activateTokens(Project(project).developerTokens(), Project(project).investorTokens(), wallet);

        forwardFundsToDeveloper(Project(project).capitalRequired());

        weiRaised = weiRaised.sub(Project(project).capitalRequired());

        Project(project).active = true;

        emit LogProject(projectId, Project(project).name(), Project(project).valuation(), Project(project).capitalRequired(), Project(project).developerTokens(), Project(project).investorTokens(), Project(project).lat(), Project(project).lng(), Project(project).voteCount(), true);
      }
  }
}
