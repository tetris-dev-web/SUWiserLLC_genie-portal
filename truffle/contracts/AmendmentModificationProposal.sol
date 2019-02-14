pragma solidity >=0.4.22 <0.6.0;
import './Amendment.sol'
import './utility/Ownable.sol'
import './utility/SafeMath.sol'

contract AmendmentModificationProposal is Ownable {
  using SafeMath for uint256;
  uint256 public amendmentId;
  AmendmentPoll public amendmentPoll;

  constructor(uint256 _amendmentId, AmendmentPoll _amendmentPoll) public {
    amendmentId = _amendmentId;
    amendmentPoll = AmendmentPoll(_amendmentPoll);
  }

  uint256 public totalModifications;
  uint256 public totalModificationsExecuted;
  struct Modification {
    Amendment newAmendment,
    bool executed;
    bool exists;
  }
  mapping(uint256 => Modification) public modificationByCoAmendment;


  function addModification (uint256 coAmendmentId, Amendment newCoAmendment) external {
    require(msg.sender == developer);
    require(amendmentPoll.open());
    totalModifications = totalModifications.add(1);
    Modification memory newModification;
    newModification.newAmendment = newCoAmendment;
    newModification.exists = true;
    modificationByCoAmendment[coAmendmentId] = newModification;
  }

  function executeModification (uint256 coAmendmentId) external {
    require(modificationByCoAmendment[coAmendmentId].exists);
    totalModificationsExecuted = totalModificationsExecuted.add(1);
    Amendment newCoAmendment = modificationByCoAmendment[coAmendmentId].newAmendment;
    bool finalModification = totalModificationsExecuted == totalModifications;

    CoOp(owner).adoptAmendmentModification(
      amendmentId,
      coAmendmentmentId,
      newCoAmendment,
      finalModification
      );
  }
}
