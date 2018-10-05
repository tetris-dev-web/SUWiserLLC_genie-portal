pragma solidity 0.4.24;

import '../token/GNIToken.sol';
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';

contract GNITokenCrowdsale is TimedCrowdsale {
    using SafeMath for uint256;
    uint256 public totalValuation;

    constructor
        (
          uint256 _openingTime,
          uint256 _doomsDay,
          uint256 _rate,
          address _wallet,
          MintableToken _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _doomsDay) {
            totalValuation = 0;
        }

        struct Project {
            string name;
            uint256 closingTime;
            uint256 valuation;
            uint256 capitalRequired;
            string lat;
            string lng;
            uint256 voteCount;
            bool capitalReached;
            bool active;
        }

        event LogProject (
            uint id,
            string name,
            uint256 valuation,
            uint256 capitalRequired,
            string lat,
            string lng,
            uint256 voteCount,
            bool capitalReached,
            bool active
        );


        /* mapping(string => Project) private projects; */
        Project[] public projects;


         function getProjectInfo(uint id) public view returns(
             string, uint256, uint256, bool, uint256, uint256

         ) {
             Project memory project = projects[id];
             return (
                 project.name,
                 project.valuation,
                 project.capitalRequired,
                 project.active,
                 project.voteCount,
                 project.closingTime
             );
         }

         //change _valuation to projectvaluation
         function pitchProject(string _name, uint capitalRequired, uint256 _valuation, string _lat, string _lng) public payable {
            issueTokensBasedOnPrice(_valuation);

             totalValuation = totalValuation.add(_valuation);

             // Increase crowdsale duation by 90 days
             _extendDoomsDay(90);

             // Create project information
             /* Project memory newProject = Project({
                 name: _name,
                 closingTime: now + 86600 * 240,
                 valuation: _valuation,
                 capitalRequired: capitalRequired,
                 lat: _lat,
                 lng: _lng,
                 capitalReached: false,
                 active: false,
                 voteCount: 0
             }); */

             // Save project information
             /* projects[_name] = newProject; */

             uint id = projects.push(Project(_name, now + 86600 * 240, _valuation, capitalRequired, _lat,_lng, 0, false, false)) - 1;

             // log the creation of the new project
             emit LogProject(id, _name, _valuation, capitalRequired, _lat, _lng, 0, false, false);
         }

         function issueTokensBasedOnPrice(uint256 valuation) private {
           uint256 tokensToIssue = valuation.div(rate);

           //tokens go to the this contract
           //we need to do this because transfer expects to take tokens from msg.sender, which is this contract
           GNIToken(token).mint(this, tokensToIssue);
         }

         //sender is always the beneficiary
         //sender becomes this contract in BasicToken
         //funds from msg.value are allocated to this contract since this function is a payable.
         //later, we can assign funds to the wallet (which is the developer wallet). No second wallet is needed because the contract serves as an escrow wallet.
         function handleTokenPurchase (uint256 _projectId) public payable {
           buyTokens(msg.sender);
           updateProjectVotedFor(_projectId);
         }

         function forwardFundsToDeveloper (uint256 amount) internal {
           wallet.transfer(amount);
         }

         function updateProjectVotedFor(uint256 _projectId) {
           updateVoteCount(_projectId);
           extendProjectClosingTime(_projectId);
         }

         /* Project storage _projectVotedFor = projects[_projectId]; */

        function updateVoteCount(uint256 _projectId) internal {
          projects[_projectId].voteCount = projects[_projectId].voteCount.add(1);
        }

        function extendProjectClosingTime(uint256 _projectId) internal {
          projects[_projectId].closingTime = projects[_projectId].closingTime.add(43200);
        }

        function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
          doomsDay = doomsDay.add(_days.mul(1728000));
        }



    function projectToActivate() public view returns (uint256, string) {
      uint256 leadingProjectId;

      for(uint256 i = 0; i < projects.length; i = i.add(1)){
          if (!projects[i].active &&
              projects[i].voteCount > 0 &&
              projects[i].voteCount >= projects[leadingProjectId].voteCount
             )
          {
            leadingProjectId = i;
          }
      }

      if (projects[leadingProjectId].capitalRequired >= weiRaised) {
        return (leadingProjectId, projects[leadingProjectId].name);
      } else {
        return (0, "");
      }
    }

    function activateProject() public {
        var(projectId, projectName) = projectToActivateDetails();
        if(keccak256(projectName) != keccak256("")){
            // transfer money from wallet address to projectToDeploy address
            Project project = projects[projectId];
            forwardFundsToDeveloper(project.capitalRequired);

            // subtract weiRaised by winningProject.cost
            weiRaised = weiRaised.sub(project.capitalRequired);

            // set project deployment status to true
            winningProject.active = true;

            // log the deployment of the new project
            emit LogProject(id, project.name, project.valuation, project.capitalRequired, project.lat, project.lng, project.voteCount, true, true);
    }
  }


}
