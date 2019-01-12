pragma solidity ^0.4.24;
import './ProjectLeaderTracker.sol';
import './ContractStub.sol';

contract ProjectLeaderTrackerStub is ProjectLeaderTracker, ContractStub {
  address addr;
  function trackProject (address projectAddr) public { //we need more tests for new functionality (when its implemented)
    CallData storage methodState = method['trackProject'];
    methodState.firstAddress = projectAddr;
    methodState.called = true;
  }

  function tentativeLeader () external view returns (address, bool) {
    return (address(0), true);
  }

  function handleProjectActivation () onlyOwner external {

  }

  function handleProjectPitch () onlyOwner external {

  }

  modifier onlyOwner {
    _;
  }

}
