pragma solidity ^0.4.24;
import './Project.sol';
import './utility/Ownable.sol';
import './utility/SafeMath.sol';

contract ProjectLeaderTracker is Ownable {
  using SafeMath for uint256;
  uint256 public candidateCount;
  address public tentativeLeaderAddr;
  uint256 public leadingVoteCount;

  struct ProjectsChecked {
    mapping(address => bool) isChecked;
    uint256 totalChecked;
  }

  uint256 internal currentCheckCycle;
  mapping(uint256 => ProjectsChecked) internal checkCycle;

  function tentativeLeader () external view returns (address, bool) {
    return (tentativeLeaderAddr, tentativeLeaderConfirmed());
  }

  function handleProjectActivation () onlyOwner external {
    resetProjectsChecked();
    setTentativeLeader(address(0));
    decrementCandidateCount();
  }

  function handleProjectPitch () onlyOwner external {
    candidateCount = candidateCount.add(1);
  }

  function considerTentativeLeaderShip (address projectAddr) public { //we need more tests for new functionality (when its implemented)
    require(!Project(projectAddr).active());

    if(Project(projectAddr).open()) {
      if (shouldUpdateTentativeLeader(projectAddr)) {
        updateTentativeLeader(projectAddr);
      }

      else if (projectAddr == tentativeLeaderAddr) {
        maintainTentativeLeaderAndUpdate();
      }
    }

    recordCheck(projectAddr);
  }

  function recordCheck (address projectAddr) internal {
    if (!alreadyChecked(projectAddr)) {
     checkCycle[currentCheckCycle].totalChecked = checkCycle[currentCheckCycle].totalChecked.add(1);
     checkCycle[currentCheckCycle].isChecked[projectAddr] = true;
    }
  }

  function updateTentativeLeader (address newLeaderAddr) internal {
    if (currentLeaderClosed()) {
      resetProjectsChecked();
    }
    setTentativeLeader(newLeaderAddr);
  }

  function maintainTentativeLeaderAndUpdate () internal {
    uint256 currentLeaderVotes = Project(tentativeLeaderAddr).totalVotes_();
    if (currentLeaderVotes < leadingVoteCount) {
      resetProjectsChecked();
    }
    setLeadingVoteCount();
  }

  function resetProjectsChecked() internal {
    ProjectsChecked memory newProjectsChecked;
    currentCheckCycle = currentCheckCycle.add(1);
    checkCycle[currentCheckCycle] = newProjectsChecked;
  }

  function setTentativeLeader(address newLeaderAddr) internal {
    tentativeLeaderAddr = newLeaderAddr;
    setLeadingVoteCount();
  }

  function setLeadingVoteCount () internal {
    if (tentativeLeaderAddr == address(0)) {
      leadingVoteCount = 0;
    } else {
      leadingVoteCount = Project(tentativeLeaderAddr).totalVotes_();
    }
  }

  function decrementCandidateCount() internal {
    candidateCount = candidateCount.sub(1);
  }

  function shouldUpdateTentativeLeader (address projectAddr) internal view returns (bool) {
    return Project(projectAddr).totalVotes_() > leadingVoteCount ||
           tentativeLeaderAddr == address(0) ||
           !Project(tentativeLeaderAddr).open();
  }

  function currentLeaderClosed () internal view returns (bool) {
    return (tentativeLeaderAddr != address(0) && !Project(tentativeLeaderAddr).open());
  }

  function alreadyChecked (address projectAddr) internal view returns (bool) {
    return checkCycle[currentCheckCycle].isChecked[projectAddr];
  }

  function tentativeLeaderConfirmed () internal view returns (bool) {
    return checkCycle[currentCheckCycle].totalChecked == candidateCount;
  }
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
