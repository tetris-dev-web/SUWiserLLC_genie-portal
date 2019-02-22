pragma solidity >=0.4.22 <0.6.0;
import '../ContractStub.sol';
import '../Amendment.sol';

contract AmendmentStub is Amendment, ContractStub {
  constructor(bool _replacable) public
  Amendment(_replacable) {}

  function modifyAmendment (uint256 n, address a) external {
    CallData storage methodState = method["modifyAmendment"];
    methodState.firstUint = n;
    methodState.firstAddress = a;
  }

  function closeFunctionality () external {
    CallData storage methodState = method["closeFunctionality"];
    methodState.called = true;
  }
}
