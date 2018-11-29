pragma solidity 0.4.24;
import './utility/SafeMath.sol';
import './Project.sol';
import './utility/Ownable.sol';

contract ProjectQueue is Ownable {
  using SafeMath for uint256;
  uint256 internal start = 1;
  uint256 internal end;

  mapping(uint256 => address) addr;
  mapping(address => uint256) position;

  function empty () public view returns (bool) {
    return end == 0;
  }

  function leadingProjectAddr () public view returns (address) {
    return addr[start];
  }

  function enqueue (address projectAddr) public {
    end = end.add(1);
    addr[end] = projectAddr;
    position[projectAddr] = end;
    heapifyUp(end);
  }

  function dequeue () public returns (address) {
    swap(start, end);
    address toRemove = addr[end];
    end = end.sub(1);
    heapifyDown(start);
    return toRemove;
  }
  //add a parameter that indicates the direction. the crowdsale will always know which direction. redo the tests for this to reflect the change
  function heapify (address projectAddr) public {
    uint256 startPosition = position[projectAddr];
    heapifyUp(startPosition);
    heapifyDown(startPosition);
  }

  function heapifyUp (uint256 startPosition) internal {
    uint256 parentPosition = startPosition.div(2);
    Project project = Project(addr[startPosition]);
    address otherProjectAddr = addr[parentPosition];

    if (parentPosition >= start && project.beats(otherProjectAddr)) {
      swap(parentPosition, startPosition);
      heapifyUp(parentPosition);
    }
  }

  function heapifyDown (uint256 startPosition) internal {
    uint256 maxChildPosition = getMaxChildPosition(
      startPosition.mul(2),
      startPosition.mul(2).add(1)
    );

    if (maxChildPosition != 0 && Project(addr[maxChildPosition]).beats(addr[startPosition])) {
      swap(maxChildPosition, startPosition);
      heapifyDown(maxChildPosition);
    }
  }

  function getMaxChildPosition (uint256 childPosition1, uint256 childPosition2) internal returns(uint256) {
    if (childPosition1 <= end) {

      if (childPosition2 > end) {
        return childPosition1;
      }
      if (Project(addr[childPosition1]).beats(addr[childPosition2])) {
        return childPosition1;
      }

      return childPosition2;
    }

    return 0;
  }

  function swap (uint256 position1, uint256 position2) internal {
    address addr1 = addr[position1];
    address addr2 = addr[position2];

    addr[position1] = addr2;
    addr[position2] = addr1;

    position[addr1] = position2;
    position[addr2] = position1;
  }
}
