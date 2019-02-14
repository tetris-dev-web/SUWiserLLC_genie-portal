pragma solidity >=0.4.22 <0.6.0;
import './Amendment.sol';
import './AmendmentModificationProposal.sol';
import './NewAmendmentProposal.sol';
import './utility/SafeMath.sol';
//we need logic to stop adding new proposals and open up the polls

contract CoOp {
  using SafeMath for uint256;
  uint256 public developer;
  AmendmentPoll public _amendmentPoll;

  constructor(address _developer, AmendmentPoll _amendmentPoll) public {
    developer = _developer;
  }

  uint256 public totalAmendmentCount;
  mapping(uint256 => Amendment) public amendmentById;

  struct Proposals {
    bool notAcceptingNewProposals;

    uint256 totalNewAmendments;
    mapping(uint256 => NewAmendmentProposal) newProposal;
    mapping(address => bool) newProposalExists;

    uint256 totalAmendmentModifications;
    mapping(uint256 => AmendmentModificationProposal) modificationProposal;
    mapping(address => bool) modificationProposalExists;

    uint256 totalCompleteAdoptions;
  }

  uint256 public currentProposalsId;
  mapping(uint256 => Proposals) public proposalsById;//uses the currentProposalsId

  function initNewProposals () external {
    require(msg.sender == developer);
    require(adoptionsComplete() || !amendmentPoll.proposalsPassed());//proposals passed will throw if the election has not been determined yet
    currentProposalsId = currentProposalsId.add(1);
    Proposals memory newProposals;
    proposalsById[currentProposalsId] = newProposals;
  }

  function initElection () external {
    require(msg.sender == developer);
    proposalsById[currentProposalsId].notAcceptingNewProposals = true;
    amendmentPoll.openPoll();
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
    require(amendment.proposalsPassed());
    require(currentProposals.newProposalExists[msg.sender]);

    totalAmendmentCount = totalAmendmentCount.add(1);
    amendmentById[totalAmendmentCount] = newAmendment;

    updateCompleteAdoptions(true);

    return totalAmendmentCount;
  }

  function updateCompleteAdoptions (bool canUpdate) internal {
    if(canUpdate) {
      currentProposals.totalCompleteAdoptions = currentProposals.totalCompleteAdoptions.add(1);
    }
  }

  function adoptionsComplete () internal returns (bool) {
    Proposals currentProposals = proposalsById[currentProposalsId];

    return currentProposals.totalCompleteAdoptions == currentProposals.totalNewAmendments.add(currentProposals.totalAmendmentProposals);
  }
}



//we need a prospective amendment contract
  //we need to be able to give it new ids that map to other amendments
//we need a contract that updates current amendments
  //it needs to be able to update id cos to new contracts
