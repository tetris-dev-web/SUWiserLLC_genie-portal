pragma solidity 0.4.24;

import './GNIToken.sol';
import 'openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract xFitTokenCrowdsale is TimedCrowdsale, MintedCrowdsale {
    using SafeMath for uint256;

    constructor (uint256 _openingTime,
            uint256 _closingTime,
            uint256 _rate,
            address _wallet,
            MintableToken _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime) {
            // rewriting wallet to this will not work in contructor
            wallet = this;
        }

    // Details for xFit box Project proposal
    struct Project {
        string location;
        uint256 cost;
        address creator;
        string name;
        string lat;
        string lng;
        uint256 voteCount;
        bool complete;
    }

    // event for viewing projects on front end
    event LogProject(
        string location,
        uint cost,
        address creator,
        string name,
        string lat,
        string lng,
        bool complete
    );

    // project mapping <location, ProjectStruct>
    mapping(string => Project) private projects;

    function sendTokenPayment(address tokenOwner) public payable {
        tokenOwner.transfer(msg.value);
    }


    function getProjectInfo(string _location) public view returns(
        string, uint256,address,bool,uint256

    ) {
        Project memory project = projects[_location];
        return (
            project.location,
            project.cost,
            project.creator,
            project.complete,
            project.voteCount
        );
    }

    // All Project addresses
    struct ProjectAddress {
        string location;
        bool deployed;
    }

    // Array for storing all Project addresses
    ProjectAddress[] public projectAddresses;

    // Struct which will store purchased tokens
    struct PurchasedToken {
        string tokenName;
        string projectVotedFor;
    }

    // Keeps a running total of votes cast
    uint256 totalVoteCount;

  /**
   * @dev Create and save a new xFit project proposal
   * @param _location Street address of new xFit box
   * @param _cost Cost of new xFit project
   * @param _creator Address of the project proposal creator
   */
   // TODO add minumum contribution amount for a project proposal
    function createProject(string _location, uint _cost, address _creator, string _name, string _lat, string _lng) public payable {
        // Send project creation fee to Genus wallet
        // need to update this to wallet, not contract
        _forwardFunds();

        // Increase crowdsale duation by 90 days
        _extendClosingTime(90);

        // Create project information
        Project memory newProject = Project({
            location: _location,
            cost: _cost,
            creator: _creator,
            name: _name,
            lat: _lat,
            lng: _lng,
            complete: false,
            voteCount: 0
        });

        // Save project information
        projects[_location] = newProject;

        // Create project information
        ProjectAddress memory newProjectAddress = ProjectAddress({
            location: _location,
            deployed: false
        });

        // save ProjectAddress information
        projectAddresses.push(newProjectAddress);

        // log the creation of the new project
        emit LogProject(_location, _cost, _creator, _name, _lat, _lng, false);
    }


  /**
   * @dev Buy a project specific xFitToken
   * @param _beneficiary Address performing the token purchase
   * @param _location xFit project bought into
   * @param _tokenName name of token
   */
    function buyxFitToken(address _beneficiary, string _location, string _tokenName) public payable {
        // Can we change this to msg.sender so that there is not option to buy on behalf of someone else;

        // before buyToken, verify that the project is still undeployed
        require(!projects[_location].complete);
        buyTokens(_beneficiary);
        updateVoteCount(_location);
        address projectVotedForOwner = projects[_location].creator;
        xFitToken(token).assignPin(_tokenName, _beneficiary, _location, projectVotedForOwner);
    }

    function updateVoteCount( string _location) internal {
        //removed address _beneficiary, - unsed var
        // update project voteTotals
        projects[_location].voteCount = projects[_location].voteCount.add(1);
        // update total vote count
        totalVoteCount = totalVoteCount.add(1);
    }


 /**
   * @dev Checks if any project can deploy
   */
    function canDeployProject() public view returns (string, uint256){
        string memory leadingProject;
        uint256 leadingPercentage;
        uint256 votePercentage;
        uint256 secondLeadingPercentage;
        uint256 projectVoteCount;
        uint256 leadingProjectIndex;
        for(uint256 i = 0; i < projectAddresses.length; i = i.add(1)){
            if (!projectAddresses[i].deployed){
                projectVoteCount = projects[projectAddresses[i].location].voteCount;
                if (projectVoteCount > 0){
                    votePercentage = (projectVoteCount.mul(1000000)).div(totalVoteCount);
                    if (votePercentage >= leadingPercentage){
                        secondLeadingPercentage = leadingPercentage;
                        leadingPercentage = votePercentage;
                        leadingProjectIndex = i;
                        leadingProject = projectAddresses[i].location;
                    }
                }
            }

        }
        if(projects[leadingProject].cost <= weiRaised && leadingPercentage > secondLeadingPercentage){
            return (leadingProject, leadingProjectIndex);
        } else {
            return ("",0);
        }
    }

  /**
   * @dev Checks if a project can deploy, then deploys
   */
    function deployProject() public payable{
         (string memory projectToDeploy, uint256 projectIndex) = canDeployProject();
        if(keccak256(abi.encodePacked(projectToDeploy)) != keccak256(abi.encodePacked(""))){
            // transfer money from wallet address to projectToDeploy address
            Project storage winningProject = projects[projectToDeploy];
            winningProject.creator.transfer(winningProject.cost);

            // subtract weiRaised by winningProject.cost
            weiRaised = weiRaised.sub(winningProject.cost);

            // subtract votes from winning project from vote total
            totalVoteCount.sub(winningProject.voteCount);

            // set project deployment status to true
            winningProject.complete = true;
            projects[winningProject.location] = winningProject;
            projectAddresses[projectIndex].deployed = true;

            // log the deployment of the new project
            emit LogProject(winningProject.location, winningProject.cost, winningProject.creator, winningProject.name, winningProject.lat, winningProject.lng, true);
        }
    }

  /**
   * @dev Extends the period in which the crowdsale is open
   * @param _days number of days to increased the closing time
   */
    function _extendClosingTime(uint256 _days) internal onlyWhileOpen {
        closingTime = closingTime.add(_days.mul(1728000));
    }

  /**
   * @dev Overrides Crowdsale fund forwarding, sending funds to crowdsale contract instead of wallet.
   */
    function _forwardFunds() internal {}
}
