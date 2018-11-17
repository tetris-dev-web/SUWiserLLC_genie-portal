pragma solidity 0.4.25;
import './ContractStub.sol';
import './ProjectQueue.sol';

contract ProjectQueueStub is ProjectQueue, ContractStub {
  address mockLeader;

  function addStubLeader (address _mockLeader) public {
    mockLeader = _mockLeader;
  }

  function enqueue (address projectAddr) public {
    CallData storage methodState = method['enqueue'];
    methodState.firstAddress = projectAddr;
  }

  function dequeue () public returns (address) {
    CallData storage methodState = method['enqueue'];
    methodState.called = true;
  }

  function heapify (address projectAddr) public {
    CallData storage methodState = method['heapify'];
    if (methodState.firstAddress == address(0)) {
      methodState.firstAddress = projectAddr;
    } else {
      methodState.secondAddress = projectAddr;
    }
  }
}
