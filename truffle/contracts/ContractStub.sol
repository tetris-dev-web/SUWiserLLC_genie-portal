pragma solidity 0.4.24;

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
    address thirdAddress;
    bytes firstBytes;
    bytes32 firstBytes32;
    bool called;
    uint256 callCount;
    bool correctCallOrder;
  }

  mapping(string => CallData) internal method;

  function addMethod (string methodName) public {
    CallData memory newCallData;
    method[methodName] = newCallData;
  }

  function resetMethod (string methodName) public {
    CallData storage data = method[methodName];

    data.firstUint = 0;
    data.secondUint = 0;
    data.thirdUint = 0;
    data.firstString = '';
    data.secondString = '';
    data.thirdString = '';
    data.firstAddress = address(0);
    data.secondAddress = address(0);
    data.thirdAddress = address(0);
    data.firstBytes = '';
    data.firstBytes32 = '';
    data.called = false;
    data.callCount = 0;
    data.correctCallOrder = false;
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
    address,
    bool,
    uint256,
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
      data.thirdAddress,
      data.called,
      data.callCount,
      data.correctCallOrder
    );
  }
}
