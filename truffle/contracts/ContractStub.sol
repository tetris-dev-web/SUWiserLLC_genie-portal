pragma solidity ^0.4.24;

contract ContractStub {
  struct CallData {
    uint256 firstUint;
    uint256 secondUint;
    uint256 thirdUint;
    string firstString;
    string secondString;
    string thirdString;
    address firstAddress;
    address secondAddress;
    bool called;
  }

  mapping(string => CallData) internal method;

  function addMethod (string methodName) public {
    CallData memory newCallData;
    method[methodName] = newCallData;
  }

  function callHistory (string methodName) public view returns (
    uint256,
    uint256,
    uint256,
    string,
    string,
    string,
    address,
    address,
    bool
    ) {
    CallData memory data = method[methodName];
    return (
      data.firstUint,
      data.secondUint,
      data.thirdUint,
      data.firstString,
      data.secondString,
      data.thirdString,
      data.firstAddress,
      data.secondAddress,
      data.called
    );
  }
}
