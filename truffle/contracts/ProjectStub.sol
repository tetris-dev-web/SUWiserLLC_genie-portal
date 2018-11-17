pragma solidity ^0.4.23;
import './Project.sol';
import './ContractStub.sol';

contract ProjectStub is Project, ContractStub {
  constructor (
    uint256 _id,
    string _name,
    address _developer,
    uint256 _valuation,
    uint256 _capitalRequired,
    uint256 _developerTokens,
    uint256 _investorTokens,
    string _lat,
    string _lng,
    uint256 _mockVotes
    )
    public
    Project(
      _id,
      _name,
      _developer,
      _valuation,
      _capitalRequired,
      _developerTokens,
      _investorTokens,
      _lat,
      _lng
      )
      {
    totalVotes = _mockVotes;
  }

  function vote (address voter, uint256 voteAmount) external {
    CallData storage methodState = method['vote'];
    methodState.firstAddress = voter;
    methodState.firstUint = voteAmount;
  }

  function removeVotes (address voter, uint256 voteAmount) external {
    CallData storage methodState = method['removeVotes'];
    methodState.firstAddress = voter;
    methodState.firstUint = voteAmount;
  }
}
