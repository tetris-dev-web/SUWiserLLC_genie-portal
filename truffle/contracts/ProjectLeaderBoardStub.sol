pragma solidity ^0.4.24;

contract ProjectLeaderBoardStub {
  address addr;
  function considerTentativeLeaderShip (address projectAddr) public { //we need more tests for new functionality (when its implemented)
    addr = projectAddr;
  }

  function tentativeLeader () public view returns (address, uint256, bool) {
    return (address(0), 10000000, true);
  }

  function handleProjectActivation () onlyOwner external {

  }

  function incrementCandidateCount() onlyOwner external {

  }

  modifier onlyOwner {
    _;
  }

}
