pragma solidity >=0.4.22 <0.6.0;
import './utility/Ownable.sol';

contract Amendment is Ownable {
  uint256 public totalCoAmendments;
  mapping(uint256 => address) public amendmentById;

  bool private _depricated;
  bool public replacable;
  bool public finishedAddingCoAmendments;

  modifier onlyWhileValid () {
    require(!_depricated);
    _;
  }

  modifier onlyIfReplaceable () {
    require(replacable);
    _;
  }

  constructor (
      bool _replacable
    ) public {
      replacable = _replacable;
    }

    function addCoAmendment (address coAmendment) external onlyOwner {
      require(!finishedAddingCoAmendments);
      totalCoAmendments = totalCoAmendments + 1;
      amendmentById[totalCoAmendments] = coAmendment;
    }

    function stopAddingCoAmendments () external onlyOwner {
      finishedAddingCoAmendments = true;
    }

    function modifyAmendment(uint256 coAmendmentToUpdateId, address newReferenceAmendment) external onlyOwner onlyIfReplaceable {
      amendmentById[coAmendmentToUpdateId] = newReferenceAmendment;
    }

    function depricated () public view returns (bool) {
      return _depricated;
    }

    function closeFunctionality() external onlyOwner {
      _depricated = true;
    }
}
