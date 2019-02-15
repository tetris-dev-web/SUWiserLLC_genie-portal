pragma solidity >=0.4.22 <0.6.0;
import './utility/Ownable.sol';
import './AmendmentRemovalProposal.sol';
import './AmendmentModificationProposal.sol';
import './NewAmendmentProposal.sol';

contract Proposals is Ownable {
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

  address public newCooperative;

  function newCooperativeProposalExists (address _newCooperative) public {
    return newCooperative == _newCooperative;
  }

  function closeAddingNewProposals () onlyOwner external {
    notAcceptingNewProposals = true;
  }

  function proposeNewCooperative (address _newCooperative) external {
    require(msg.sender == developer);
    require(newCooperative == address(0));
    require(!notAcceptingNewProposals);
    newCooperative = new NewCooperative(_newCooperative);
  }

  function proposeAmendmentModification (uint256 amendmentId) external {
    require(msg.sender == developer);
    require(!notAcceptingNewProposals);
    address proposalAddress = new AmendmentModificationProposal(amendmentId, address(amendmentPoll));
    AmendmentModificationProposal newProposal = AmendmentModificationProposal(proposalAddress);
    totalAmendmentModifications = totalAmendmentModifications.add(1);
    modificationProposal[totalAmendmentModifications] = newProposal;
    modificationProposalExists[proposalAddress];
  }

  function proposeNewAmendment (Amendment newAmendment) external {
    require(msg.sender == developer);
    require(!notAcceptingNewProposals);
    address proposalAddress = new NewAmendmentProposal(newAmendment);
    NewAmendmentProposal newProposal = NewAmendmentProposal(proposalAddress);
    totalNewAmendments = totalNewAmendments.add(1);
    newProposal[totalNewAmendments] = newProposal;
    newProposalExists[proposalAddress];
  }

  function proposeAmendmentRemoval (uint256 amendmentId) external {
    require(msg.sender == developer);
    require(!notAcceptingNewProposals);
    address proposalAddress = new AmendmentRemovalProposal(newAmendment);
    AmendmentRemovalProposal removeProposal = AmendmentRemovalProposal(proposalAddress);
    totalAmendmentRemovals = totalAmendmentRemovals.add(1);
    removalProposal[totalAmendmentRemovals] = removalProposal;
    removalProposalExists[proposalAddress];
  }

  function recordCooperativeAdoption() external onlyOwner {
    newCooperative = address(0);
  }

  function recordModificationAdoption(address _modificationProposal) external onlyOwner {
    modificationPropsalExists[_modificationProposal] = false;
  }

  function recordNewAdoption(address _newProposal) external onlyOwner {
    newPropsalExists[_newProposal] = false;
  }

  function recordRemovalAdoption(address _removalProposal) external onlyOwner {
    removalPropsalExists[_removalProposal] = false;
  }
}
