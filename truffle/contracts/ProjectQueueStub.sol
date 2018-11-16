pragma solidity 0.4.25;
import './ContractStub.sol';
import './ProjectQueue.sol';

contract ProjectQueueStub is ProjectQueue, ContractStub {
  function enqueue (address projectAddr) public {
    CallData storage methodState = method['enqueue'];
    methodState.firstAddress = projectAddr;
  }
}
