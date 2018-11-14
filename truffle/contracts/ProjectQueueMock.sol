pragma solidity 0.4.25;
import './ProjectQueue.sol';
import './Project.sol';

contract ProjectQueueMock is ProjectQueue {
  function init (
    Project addr1,
    Project addr2,
    Project addr3,
    Project addr4,
    Project addr5
  ) public {
    addr[1] = addr1;
    addr[2] = addr2;
    addr[3] = addr3;
    addr[4] = addr4;
    addr[5] = addr5;

    position[addr1] = 1;
    position[addr2] = 2;
    position[addr3] = 3;
    position[addr4] = 4;
    position[addr5] = 5;

    end = 5;
  }

  function len () public returns (uint256) {
    return end;
  }

  function mockPositionOf(address projAddr) public returns (uint256) {
    for (uint256 i = 1; i <= end; i = i + 1) {
      if (addr[i] == projAddr) {
        return i;
      }
    }
    return 0;
  }
}
