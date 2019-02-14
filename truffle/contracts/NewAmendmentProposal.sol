pragma solidity >=0.4.22 <0.6.0;
import './Amendment.sol';
import './utility/Ownable.sol';

contract NewAmendmentProposal is Ownable {
  Amendment public newAmendment;

  constructor (Amendment _newAmendment) public {
    newAmendment = Amendment(_newAmendment);
  }

  function executeAmendment () public {
    CoOp(owner).adoptNewAmendment(newAmendment);
  }
}
