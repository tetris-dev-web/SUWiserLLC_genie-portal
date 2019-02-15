pragma solidity >=0.4.22 <0.6.0;
import './Amendment.sol';
import './AmendmentModificationProposal.sol';
import './NewAmendmentProposal.sol';
import './utility/SafeMath.sol';
import './Cooperative0.0.sol'

contract CooperativeMock is Cooperative0.0 {
  constructor(address _developer, AmendmentPoll _amendmentPoll) public
  Cooperative0.0(_developer, _amendmentPoll) {}

  function setStubProposals (Proposals _proposals) external {
    currentProposals = _proposals;
  }
}
