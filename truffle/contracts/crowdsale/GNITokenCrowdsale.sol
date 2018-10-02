pragma solidity 0.4.24;

import '../token/GNIToken.sol';
import './MintedCrowdsale.sol';
import './TimedCrowdsale.sol';
import './CappedCrowdsale.sol';
import '../utility/SafeMath.sol';

contract GNITokenCrowdsale is TimedCrowdsale, CappedCrowdsale,  MintedCrowdsale {
    using SafeMath for uint256;
    address public developerWallet;
    uint256 public totalValuation;

    constructor
        (
          uint256 _openingTime,
          uint256 _doomsDay,
          uint256 _rate,
          address _wallet,
          address _developerWallet,
          uint256 _cap,
          MintableToken _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        //remove capped crowdsale
        CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _doomsDay) {
            // rewriting wallet to this will not work in contructor
            totalValuation = 0;
            developerWallet = _developerWallet;
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
            string name,
            uint256 valuation,
            uint256 capitalRequired,
            string lat,
            string lng,
            uint256 voteCount,
            bool capitalReached,
            bool active
        );


        mapping(string => Project) private projects;


         function getProjectInfo(string _name) public view returns(
             string, uint256, uint256, bool, uint256

         ) {
             Project memory project = projects[_name];
             return (
                 project.name,
                 project.valuation,
                 project.capitalRequired,
                 project.active,
                 project.voteCount
             );
         }


         // all tokens go to developerWallet!
         function pitchProject(string _name, uint capitalRequired, uint _valuation, string _lat, string _lng) public payable {
            issueTokensBasedOnPrice(_valuation);

             totalValuation = totalValuation.add(_valuation);

             // Increase crowdsale duation by 90 days
             _extendDoomsDay(90);

             // Create project information
             Project memory newProject = Project({
                 name: _name,
                 closingTime: now + 86600 * 240,
                 valuation: _valuation,
                 capitalRequired: capitalRequired,
                 lat: _lat,
                 lng: _lng,
                 capitalReached: false,
                 active: false,
                 voteCount: 0
             });

             // Save project information
             projects[_name] = newProject;



             // log the creation of the new project
             emit LogProject(_name, _valuation, capitalRequired, _lat, _lng, 0, false, false);
         }

         function issueTokensBasedOnPrice(uint256 valuation) private {
           uint tokensToIssue = valuation.div(rate);

           GNIToken(token).mint(wallet, tokensToIssue); // change logic to only issue if cap is reached
         }

         //remove beneficiary, just have sender, value, projectName
         //this overrides buyTokens in Crowdsale
         function buyTokens(string _projectName) public payable {
             // Can we change this to msg.sender so that there is not option to buy on behalf of someone else;

             // before buyToken, verify that the project is still undeployed
             uint256 weiAmount = msg.value;

             _preValidatePurchase(msg.sender, weiAmount);
         }

         function updateProjectVotedFor(string _projectName) {
           Project memory _projectVotedFor = projects[_projectName];

           updateVoteCount(_projectVotedFor);
           extendProjectClosingTime(_projectVotedFor);
         }

         function updateVoteCount(Project _projectVotedFor) internal {
             _projectVotedFor.voteCount = _projectVotedFor.voteCount.add(1);
         }

         // All Project addresses
         struct ProjectAddress {
             string location;
             bool deployed;
         }

        function pitchProjectandRaiseCap(uint256 _projectValue) public {
          uint newTokensIssued = 1000;
          GNIToken(token).mint(wallet, newTokensIssued); // change logic to only issue if cap is reached
          uint updatedTotalSupply = GNIToken(token).totalSupply();
          cap = cap.add(_projectValue);
          uint newRate = cap/updatedTotalSupply;
          rate = newRate;
        }

        modifier onlyDeveloper() {
          require(msg.sender == developerWallet);
          _;
        }

        function extendProjectClosingTime(Project _project) internal {
          _project.closingTime = _project.closingTime.add(43200);
        }

        function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
            doomsDay = doomsDay.add(_days.mul(1728000));
        }

}
