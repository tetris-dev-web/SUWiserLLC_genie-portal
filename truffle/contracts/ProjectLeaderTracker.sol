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

  function reset () onlyOwner external {
    resetProjectsChecked();
    setTentativeLeader(address(0));
    candidateCount = 0;
  }

  function handleProjectActivation () onlyOwner external {
    resetProjectsChecked();
    setTentativeLeader(address(0));
    decrementCandidateCount();
  }

  function handleProjectPitch () onlyOwner external {
    candidateCount = candidateCount.add(1);
  }

  function trackProject (address projectAddr) public { //we need more tests for new functionality (when its implemented)
    require(projectAddr != address(0) && !Project(projectAddr).active());

    if(Project(projectAddr).open()) {
      updateTentativeLeader(projectAddr);
    }

    recordCheck(projectAddr);
  }

  function recordCheck (address projectAddr) internal {
    if (!alreadyChecked(projectAddr)) {
     checkCycle[currentCheckCycle].totalChecked = checkCycle[currentCheckCycle].totalChecked.add(1);
     checkCycle[currentCheckCycle].isChecked[projectAddr] = true;
    }
  }

  function updateTentativeLeader (address projectAddr) internal {
    bool _leaderExists = leaderExists();
    bool _isLeader;
    bool _currentLeaderClosed;
    bool _beatsLeader;

    if (_leaderExists) {
      _isLeader = isLeader(projectAddr);
      _currentLeaderClosed = currentLeaderClosed();
      _beatsLeader = beatsLeader(projectAddr);

      if (_currentLeaderClosed || (_isLeader && !_beatsLeader)) {  //if the real leader can be a project that we have already checked
        resetProjectsChecked();
      }
    }

    if (!_leaderExists || _currentLeaderClosed || _beatsLeader) { //if the tentative leader cannot possibly be in the lead
      setTentativeLeader(projectAddr);
    } else if (_isLeader) {
      setLeadingVoteCount();
    }
  }

  function leaderExists () internal view returns (bool) {
    return tentativeLeaderAddr != address(0);
  }

  function isLeader (address projAddr) internal view returns (bool) {
    return projAddr == tentativeLeaderAddr;
  }

  function beatsLeader (address projAddr) internal view returns (bool) {
    return Project(projAddr).totalVotes_() > leadingVoteCount;
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

  function currentLeaderClosed () internal view returns (bool) {
    return !Project(tentativeLeaderAddr).open();
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
