pragma solidity >=0.4.22 <0.6.0;
import './Amendment.sol';
import './AmendmentModificationProposal.sol';
import './NewAmendmentProposal.sol';
import './utility/SafeMath.sol';
import './Cooperative.sol'
//we need logic to stop adding new proposals and open up the polls

contract Cooperative0.0 is Cooperative {
  using SafeMath for uint256;
  AmendmentPoll public _amendmentPoll;

  constructor(address _developer, AmendmentPoll _amendmentPoll) public
  Board(_developer) {
    developer = _developer;
  }

  struct Proposals {
    bool notAcceptingNewProposals;

    uint256 totalNewAmendments;
    mapping(uint256 => NewAmendmentProposal) newProposal;
    mapping(address => bool) newProposalExists;

    uint256 totalAmendmentModifications;
    mapping(uint256 => AmendmentModificationProposal) modificationProposal;
    mapping(address => bool) modificationProposalExists;

    uint256 totalAmendmentRemovals;
    mapping(uint256 => AmendmentRemovalProposal) removalProposal;
    mapping(address => bool) removalProposalExists;

    uint256 totalCompleteAdoptions;
  }

  struct NewCooperative {
    Cooperative newCooperative;
    uint256 totalAmendmentsMigrated;
    mapping(uint => bool) migrated;
    bool exists;
  }

  NewCooperative public newCooperative;

  uint256 public currentProposalsId;
  mapping(uint256 => Proposals) public proposalsById;//uses the currentProposalsId

  bool public canInitElection;

  function initNewProposals () external {
    require(msg.sender == developer);
    require(
      !newCooperative.exists &&
      (adoptionsComplete() || amendmentPoll.proposalsFailed())
    );
    currentProposalsId = currentProposalsId.add(1);
    Proposals memory newProposals;
    proposalsById[currentProposalsId] = newProposals;
    cantInitElection = true;
  }

  function initElection () external {
    require(msg.sender == developer);
    require(canInitElection);
    proposalsById[currentProposalsId].notAcceptingNewProposals = true;
    amendmentPoll.openPoll();
    canInitElection = false;
  }

  function proposeAmendmentModification (uint256 amendmentId) external {
    require(msg.sender == developer && currentProposalsId != 0);
    require(!proposalsById[currentProposalsId].notAcceptingNewProposals);
    address proposalAddress = new AmendmentModificationProposal(amendmentId, address(amendmentPoll));
    AmendmentModificationProposal newProposal = AmendmentModificationProposal(proposalAddress);
    proposalsById[currentProposalsId].totalAmendmentModifications = proposalsById[currentProposalsId].totalAmendmentModifications.add(1);
    proposalsById[currentProposalsId].modificationProposal[proposalsById[currentProposalsId].totalAmendmentModifications] = newProposal;
    proposalsById[currentProposalsId].modificationProposalExists[proposalAddress];
  }

  function proposeNewAmendment (Amendment newAmendment) external {
    require(msg.sender == developer && currentProposalsId != 0);
    require(!proposalsById[currentProposalsId].notAcceptingNewProposals);
    address proposalAddress = new NewAmendmentProposal(newAmendment);
    NewAmendmentProposal newProposal = NewAmendmentProposal(proposalAddress);
    proposalsById[currentProposalsId].totalNewAmendments = proposalsById[currentProposalsId].totalNewAmendments.add(1);
    proposalsById[currentProposalsId].newProposal[proposalsById[currentProposalsId].totalNewAmendments] = newProposal;
    proposalsById[currentProposalsId].newProposalExists[proposalAddress];
  }

  function proposeAmendmentRemoval (uint256 amendmentId) external {
    require(msg.sender == developer && currentProposalsId != 0);
    require(!proposalsById[currentProposalsId].notAcceptingNewProposals);
    address proposalAddress = new AmendmentRemovalProposal(newAmendment);
    AmendmentRemovalProposal removeProposal = AmendmentRemovalProposal(proposalAddress);
    proposalsById[currentProposalsId].totalAmendmentRemovals = proposalsById[currentProposalsId].totalAmendmentRemovals.add(1);
    proposalsById[currentProposalsId].removalProposal[proposalsById[currentProposalsId].totalAmendmentRemovals] = removalProposal;
    proposalsById[currentProposalsId].removalProposalExists[proposalAddress];
  }

  function proposeNewCooperative (Cooperative _newCooperative) external {
    require(msg.sender == developer && currentProposalsId != 0);
    require(!proposalsById[currentProposalsId].notAcceptingNewProposals);
    NewCooperative memory newCooperative_;
    newCooperative_.newCooperative = _newCooperative;
    newCooperative_.exists = true;
    newCooperative = newCooperative_;
  }

  function migrateAmendmentToNewCooperative (uint256 amendmentId) external {
    require(newCooperative.exists);
    require(newCooperative.migrated[amendmentId])
    require(amendmentPoll.proposalsPassed());
    require(adoptionsComplete());

    Amendment amendmentToMigrate = amendmentById[amendmentId];

    if (!amendmentToMigrate.depricated()) {
      newCooperative.newCooperative.migrateAmendment(amendmentToMigrate);
      amendmentToMigrate.transferCooperative(newCooperative.newCooperative);
    }
    
    newCooperative.migrated[amendmentId] = true;
    newCooperative.totalAmendmentsMigrated = newCooperative.totalAmendmentsMigrated.add(1);

    if (newCooperative.totalAmendmentsMigrated == totalAmendmentCount) {
      newCooperative.newCooperative.completeMigrations();
      newCooperative.newCooperative.renounceOwnership();
    }
  }

  function adoptAmendmentModification (
    uint256 amendmentId,
    uint256 coAmendmentToUpdateId,
    Amendment newReferenceAmendment,
    bool finalModification
    ) external {
    Proposals currentProposals = proposalsById[currentProposalsId];
    require(amendment.proposalsPassed());
    require(currentProposals.modificationPropsalExists[msg.sender]);// or its a new amendment and the new amendmnet has been added already

    Amendment amendmentToModify = amendmentById[amendmentId];
    amendmentToModify.modifyAmendment(coAmendmentToUpdateId, newReferenceAmendment);

    updateCompleteAdoptions(finalModification);
  }

  function adoptNewAmendment (Amendment newAmendment) external {
    require(amendmentPoll.proposalsPassed());
    require(currentProposals.newProposalExists[msg.sender]);

    totalAmendmentCount = totalAmendmentCount.add(1);
    amendmentById[totalAmendmentCount] = newAmendment;

    updateCompleteAdoptions(true);
  }

  function adoptAmendmentRemoval (uint256 amendmentId) external {
    require(amendment.proposalsPassed());
    require(currentProposals.removalProposalExists[msg.sender]);

    Amendment amendmentToRemove = amendmentById[amendmentId];
    amendmentToRemove.closeFunctionality();

    updateCompleteAdoptions(true);
  }

  function updateCompleteAdoptions (bool canUpdate) internal {
    if(canUpdate) {
      currentProposals.totalCompleteAdoptions = currentProposals.totalCompleteAdoptions.add(1);
    }
  }

  function adoptionsComplete () internal returns (bool) {
    Proposals currentProposals = proposalsById[currentProposalsId];

    return currentProposals.totalCompleteAdoptions == currentProposals.totalNewAmendments.add(currentProposals.totalAmendmentModifications).add(currentProposals.totalAmendmentRemovals);
  }
}



//we need a prospective amendment contract
  //we need to be able to give it new ids that map to other amendments
//we need a contract that updates current amendments
  //it needs to be able to update id cos to new contracts
