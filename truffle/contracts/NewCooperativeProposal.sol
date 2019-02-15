pragma solidity >=0.4.22 <0.6.0;
import './Amendment.sol';
import './utility/Ownable.sol';
import './Cooperative.sol';

contract NewAmendmentProposal is Ownable {
  Cooperative public newCooperative;

  constructor (address _newCooperative) public {
    newCooperative = _newCooperative;
  }

  function executeAmendment () public {
    Cooperative(owner).adoptNewCooperative(newCooperative);
  }
}
