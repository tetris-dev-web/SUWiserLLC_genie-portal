 pragma solidity ^0.4.24;
  /* function totalChecked () public view returns(uint256) {
    return checkCycle[currentCheckCycle].totalChecked;
  }

  function checkedStatusOf(address projectAddr) public view returns (bool) {
    return checkCycle[currentCheckCycle].isChecked[projectAddr];
  }

  function setStubProjectCount (uint256 count) public {
    inactiveProjectCount = count;
  }

  function setMockTotalChecked(uint256 num) public {
    checkCycle[currentCheckCycle].totalChecked = num;
  }

  function setMockConfirmedLeaderStatus (bool status) public {
    tentativeLeaderConfirmed = status;
  }

  function setMockTentativeLeader (address mockAddr, uint256 mockCap) public {
    tentativeLeaderAddr = mockAddr;
    tentativeLeaderCapRequired = mockCap;
  }

  function resetMockTentativeProject () public {
    tentativeLeaderAddr = address(0);
    tentativeLeaderCapRequired = 0;
    tentativeLeaderConfirmed = false;

    ProjectsChecked memory newProjectsChecked;
    currentCheckCycle = currentCheckCycle.add(1);
    checkCycle[currentCheckCycle] = newProjectsChecked;
  }

  function considerTentativeLeaderShip (uint256 _projectId) public {
    CallData storage methodState = method['considerTentativeLeaderShip'];
    methodState.firstUint = _projectId;
  }

  function considerTentativeLeaderShip_ (uint256 _projectId) public {
    super.considerTentativeLeaderShip(_projectId);
  }

  function attemptProjectActivation () public {
    CallData storage methodState = method['attemptProjectActivation'];
    methodState.called = true;
  }

  function attemptProjectActivation_ () public {
    super.attemptProjectActivation();
  } */
