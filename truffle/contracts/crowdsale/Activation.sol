pragma solidity >=0.4.22 <0.6.0;

import '../utility/SafeMath.sol';
import '../utility/Ownable.sol';
import '../utility/Secondary.sol';
import '../project/Project.sol';
import '../token/ERC20/Token.sol';
import '../projectLeader/ProjectLeaderTracker.sol';



contract Activation is Ownable {
  using SafeMath for uint256;
  Token public token;
  ProjectLeaderTracker public projectLeaderTracker;

  constructor
      (
        Token _token,
        ProjectLeaderTracker _projectLeaderTracker
      )
      public {
        token = Token(_token);
        projectLeaderTracker = ProjectLeaderTracker(_projectLeaderTracker);
      }

  event ProjectActivation (
    address addr,
    uint256 capitalRequired,
    uint256 time
  );

   function tryActivateProject (address tentativeLeaderAddr, bool tentativeLeaderConfirmed, uint256 weiRaised) external onlyOwner returns ( bool , uint256) { //we need more tests for added functionality
     Project project = Project(tentativeLeaderAddr);
     uint256 capitalRequired = project.capitalRequired_();
     if (
       tentativeLeaderConfirmed &&
       capitalRequired <= weiRaised &&
       project.open()
       ) {
       //set the number of project votes to 0.
       _activateProject(tentativeLeaderAddr);
       return (true, capitalRequired);
      }
      return (false, 0);
    }

    function activateProject (address projectAddress) external onlyOwner {
      _activateProject (projectAddress);
    }

    function _activateProject (address projectAddress) internal {
      Project project = Project(projectAddress);
      uint256 time = project.activate();
      projectLeaderTracker.handleProjectActivation();
      Token(token).increasePendingActivations(project.developerTokens_().add(project.investorTokens_()));
      emit ProjectActivation(projectAddress, project.capitalRequired_(), time);
    }

}
