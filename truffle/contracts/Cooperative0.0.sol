pragma solidity >=0.4.22 <0.6.0;
import './Amendment.sol';
import './AmendmentModificationProposal.sol';
import './NewAmendmentProposal.sol';
import './utility/SafeMath.sol';
import './Cooperative.sol'

contract Cooperative0.0 is Cooperative {
  using SafeMath for uint256;
  AmendmentPoll public _amendmentPoll;

  constructor(address _developer, AmendmentPoll _amendmentPoll) public
  Cooperative(_developer) {
    developer = _developer;
  }

  Proposals public currentProposals;
  bool public canInitElection;

  function initNewProposals () external {
    require(msg.sender == developer);
    require(
      newCooperative == address(0) &&
      (adoptionsComplete() || amendmentPoll.proposalsFailed())
    );
    address newProposals = new Proposals();
    currentProposals = Proposals(newProposals);
    totalCompleteAdoptions = 0;
    cantInitElection = true;
  }

  function initElection () external {
    require(msg.sender == developer);
    require(canInitElection);
    currentProposals.closeAddingNewProposals();
    amendmentPoll.openPoll();
    canInitElection = false;
  }

  uint256 totalCompleteAdoptions;

  address public newCooperative;
  uint256 totalAmendmentsMigrated;
  mapping(uint => bool) private migrated;

  function adoptNewCooperative (address _newCooperative) external {
    require(amendmentPoll.proposalsPassed());
    require(currentProposals.newCooperativeProposalExists(msg.sender));
    newCooperative = _newCooperative;
    currentProposals.recordCooperativeAdoption();
  }

  function migrateAmendmentToNewCooperative (uint256 amendmentId) external {
    require(newCooperative != address(0));
    require(!migrated[amendmentId])
    require(adoptionsComplete());

    Amendment amendmentToMigrate = amendmentById[amendmentId];
    Cooperative _newCooperative = Cooperative(newCooperative);

    if (!amendmentToMigrate.depricated()) {
      newCooperative.newCooperative.migrateAmendment(amendmentToMigrate);
      amendmentToMigrate.transferCooperative(newCooperative.newCooperative);
    }

    migrated[amendmentId] = true;
    totalAmendmentsMigrated = totalAmendmentsMigrated.add(1);

    if (totalAmendmentsMigrated == totalAmendmentCount) {
      _newCooperative.completeMigrations();
      _newCooperative.renounceOwnership();
    }
  }

  function adoptAmendmentModification (
    uint256 amendmentId,
    uint256 coAmendmentToUpdateId,
    Amendment newReferenceAmendment,
    bool finalModification
    ) external {
    require(amendmentPoll.proposalsPassed());
    require(currentProposals.modificationPropsalExists(msg.sender));// or its a new amendment and the new amendmnet has been added already

    Amendment amendmentToModify = amendmentById[amendmentId];
    amendmentToModify.modifyAmendment(coAmendmentToUpdateId, newReferenceAmendment);
    currentProposals.recordModificationAdoption(msg.sender);//prevent reentrancy

    updateCompleteAdoptions(finalModification);
  }

  function adoptNewAmendment (Amendment newAmendment) external {
    require(amendmentPoll.proposalsPassed());
    require(currentProposals.newProposalExists(msg.sender));

    totalAmendmentCount = totalAmendmentCount.add(1);
    amendmentById[totalAmendmentCount] = newAmendment;
    currentProposals.recordNewAdoption(msg.sender);
    
    updateCompleteAdoptions(true);
  }

  function adoptAmendmentRemoval (uint256 amendmentId) external {
    require(amendment.proposalsPassed());
    require(currentProposals.removalProposalExists(msg.sender));

    Amendment amendmentToRemove = amendmentById[amendmentId];
    amendmentToRemove.closeFunctionality();
    currentProposals.recordRemovalAdoption(msg.sender);

    updateCompleteAdoptions(true);
  }

  function updateCompleteAdoptions (bool canUpdate) internal {
    if(canUpdate) {
      totalCompleteAdoptions = totalCompleteAdoptions.add(1);
    }
  }

  function adoptionsComplete () internal returns (bool) {
    return totalCompleteAdoptions == currentProposals.totalNewAmendments().add(currentProposals.totalAmendmentModifications).add(currentProposals.totalAmendmentRemovals());
  }
}
