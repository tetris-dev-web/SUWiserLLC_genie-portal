pragma solidity >=0.4.22 <0.6.0;

import '../utility/SafeMath.sol';
import '../utility/Ownable.sol';
import '../utility/Secondary.sol';
import '../project/Project.sol';
import '../token/ERC20/Token.sol';
import '../projectLeader/ProjectLeaderTracker.sol';

//owner will be Voting
//secondary will be project factory

contract Activation is Ownable, Secondary {
  using SafeMath for uint256;
  Token public token;
  ProjectLeaderTracker public projectLeaderTracker;
  GNITokenCrowdsale public crowdsale;

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

  function setCrowdsale (GNITokenCrowdsale _crowdsale) public onlyOwner {
    crowdsale = _crowdsale;
  }

   function tryActivateProject () external onlyOwner returns ( bool , uint256) { //we need more tests for added functionality
     (
       address  tentativeLeaderAddr,
       bool tentativeLeaderConfirmed
     ) = projectLeaderTracker.tentativeLeader();

     Project project = Project(tentativeLeaderAddr);
     uint256 capitalRequired = project.capitalRequired();
     if (
       tentativeLeaderConfirmed &&
       capitalRequired <= crowdsale.weiRaised_() &&
       project.open()
       ) {
       //set the number of project votes to 0.
       _activateProject(tentativeLeaderAddr, capitalRequired);
      }
    }

    function activateProject (address projectAddress, uint256 capitalRequired) external onlyPrimary {
      _activateProject (projectAddress, capitalRequired);
    }

    function _activateProject (address projectAddress, uint256 capitalRequired) internal {
      Project project = Project(projectAddress);
      uint256 time = project.activate();
      projectLeaderTracker.handleProjectActivation();
      Token(token).increasePendingActivations(project.developerTokens().add(project.investorTokens()));
      crowdsale.transferCapitalToDeveloper(capitalRequired);
      emit ProjectActivation(projectAddress, project.capitalRequired(), time);
    }

}
