pragma solidity 0.4.25;
import './ContractStub.sol';
import './ProjectQueue.sol';

contract ProjectQueueStub is ProjectQueue, ContractStub {
  function enqueue (address projectAddr) public {
    CallData storage methodState = method['enqueue'];
    methodState.firstAddress = projectAddr;
  }

  function heapify(address projectAddr) public {
    CallData storage methodState = method['heapify'];
    if (methodState.firstAddress == address(0)) {
      methodState.firstAddress = projectAddr;
    } else {
      methodState.secondAddress = projectAddr;
    }
  }
}
