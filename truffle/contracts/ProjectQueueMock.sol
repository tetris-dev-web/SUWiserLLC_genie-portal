pragma solidity 0.4.24;
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

  function clearQueue () public {
    position[addr[1]] = 0;
    position[addr[2]] = 0;
    position[addr[3]] = 0;
    position[addr[4]] = 0;
    position[addr[5]] = 0;

    addr[1] = address(0);
    addr[2] = address(0);
    addr[3] = address(0);
    addr[4] = address(0);
    addr[5] = address(0);

    end = 0;
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
