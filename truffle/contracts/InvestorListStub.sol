pragma solidity ^0.4.24;

import './InvestorList.sol';

contract InvestorListStub is InvestorList {
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

  mapping(string => CallData) private method;

  function addMethod (string methodName) public {
    CallData memory newCallData;
    method[methodName] = newCallData;
  }

  function addInvestor (address investorAddr) external {
    CallData storage methodState = method['investorAddr'];
    methodState.called = true;
    methodState.firstAddress = investorAddr;
  }

  function addVoteCredit (address investorAddr, uint256 votes) public {
    CallData storage methodState = method['addVoteCredit'];
    methodState.called = true;
    methodState.firstAddress = investorAddr;
    methodState.firstUint = votes;
  }

  function removeVoteCredit (address investorAddr, uint256 votes) public {
    CallData storage methodState = method['removeVoteCredit'];
    methodState.called = true;
    methodState.firstAddress = investorAddr;
    methodState.firstUint = votes;
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
