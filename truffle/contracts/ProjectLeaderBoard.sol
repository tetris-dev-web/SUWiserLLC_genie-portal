pragma solidity ^0.4.24;
import './Project.sol';
import './utility/Ownable.sol';
import './utility/SafeMath.sol';

//we need to make tests for these
//game theory of this needs to be analyzed further
contract ProjectLeaderBoard is Ownable {
  using SafeMath for uint256;
  uint256 public candidateCount;
  address public tentativeLeaderAddr;
  uint256 public tentativeLeaderCapRequired;
  bool public tentativeLeaderConfirmed;

  struct ProjectsChecked {
    mapping(address => bool) isChecked;
    uint256 totalChecked;
  }

  uint256 internal currentCheckCycle;
  mapping(uint256 => ProjectsChecked) internal checkCycle;

  function considerTentativeLeaderShip (address projectAddr) public { //we need more tests for new functionality (when its implemented)
    require(Project(projectAddr).open() && !Project(projectAddr).active());

    if (
      tentativeLeaderAddr == address(0) ||
      Project(projectAddr).totalVotes_() > Project(tentativeLeaderAddr).totalVotes_() ||
      !Project(tentativeLeaderAddr).open()
      )
    {
      updateTentativeLeader(projectAddr);
    } else if (projectAddr == tentativeLeaderAddr) {
      //if it increased, we just increase the variable.
      //if votes decreased, we call updateTentativeLeader with address 0
    }

    recordCheck(projectAddr);

    if (checkCycle[currentCheckCycle].totalChecked == candidateCount){
      tentativeLeaderConfirmed = true;
    }
  }

  function recordCheck (address projectAddr) internal {
    bool hasBeenChecked = checkCycle[currentCheckCycle].isChecked[projectAddr];

    if (!hasBeenChecked) {
     checkCycle[currentCheckCycle].totalChecked = checkCycle[currentCheckCycle].totalChecked.add(1);
     checkCycle[currentCheckCycle].isChecked[projectAddr] = true;
    }
  }

  function updateTentativeLeader (address newLeaderAddr) internal {
    //if its overtaking a project that is open, that means it has more votes and we dont need to reset all the checks
    if (tentativeLeaderAddr != address(0) && !Project(tentativeLeaderAddr).open()) {
      resetProjectsChecked();
    }
    setTentativeLeader(newLeaderAddr);
  }

  function resetProjectsChecked() internal {
    ProjectsChecked memory newProjectsChecked;
    currentCheckCycle = currentCheckCycle.add(1);
    checkCycle[currentCheckCycle] = newProjectsChecked;
    candidateCount = candidateCount.sub(1);
  }

  function setTentativeLeader(address newLeaderAddr) internal {
    Project newLeader = Project(newLeaderAddr);

    tentativeLeaderAddr = newLeaderAddr;
    //these next two lines only runs if the address isnt addr(0)
    tentativeLeaderCapRequired = newLeader.capitalRequired_();
    //we also need to reset the tentative leader votes, either to a real amount or based on if there is a new leader
    tentativeLeaderConfirmed = false;
  }

  /* function attemptProjectActivation () public {
    if (
      tentativeLeaderCapRequired <= weiRaised &&
      tentativeLeaderConfirmed &&
      Project(tentativeLeaderAddr).open()
      ) {
      activateProject();
    }
  } */

  function tentativeLeader () public view returns (address, uint256, bool) {
    return (tentativeLeaderAddr, tentativeLeaderCapRequired, tentativeLeaderConfirmed);
  }

  function handleProjectActivation () onlyOwner external {
    updateTentativeLeader(address(0));
    candidateCount = candidateCount.sub(1);
  }

  function incrementCandidateCount() onlyOwner external {
    candidateCount = candidateCount.add(1);
    //we should probably updateTentativeLeader with account 0...
  }

  /* function activateProject () internal { //we need more tests for added functionality
    Project project = Project(tentativeLeaderAddr);
    project.activate();
    project.log();
    //reduce cast vote count by the number of project votes, set the number of project votes to 0.

    forwardFunds(developer, tentativeLeaderCapRequired);
    weiRaised = weiRaised.sub(tentativeLeaderCapRequired);
    candidateCount = candidateCount.sub(1);
    Token(token).increasePendingActivations(project.developerTokens_().add(project.investorTokens_()));
  } */

}
