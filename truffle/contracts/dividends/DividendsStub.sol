pragma solidity >=0.4.22 <0.6.0;
import '../utility/SafeMath.sol';
import '../token/ActiveToken.sol';
import '../crowdsale/GNITokenCrowdsale.sol';
import '../ContractStub.sol';

contract DividendsStub is Dividends, ContractStub {
  using SafeMath for uint256;

  constructor (ActiveToken token_) public
  Dividends(token_) {}

  function distributeDividend(address  account) external returns (bool) {
    CallData storage methodState = method['distributeDividend'];
    methodState.called = true;
    methodState.firstAddress = account;
    return true;
  }

  function receiveDividends () external payable {
    CallData storage methodState = method['receiveDividends'];
    methodState.called = true;
    methodState.firstUint = msg.value;
  }
}
