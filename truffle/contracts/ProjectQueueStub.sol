pragma solidity 0.4.24;
import './ContractStub.sol';
import './ProjectQueue.sol';

contract ProjectQueueStub is ProjectQueue, ContractStub {
  address stubLeader;

  function addStubLeader (address _stubLeader) public {
    stubLeader = _stubLeader;
  }

  function leadingProjectAddr () public view returns (address) {
    return stubLeader;
  }

  function enqueue (address projectAddr) public {
    CallData storage methodState = method['enqueue'];
    methodState.firstAddress = projectAddr;
  }

  function dequeue () public returns (address) {
    CallData storage methodState = method['dequeue'];
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
