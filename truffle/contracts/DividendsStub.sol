pragma solidity 0.4.24;
import './utility/SafeMath.sol';
import './token/ERC20/Token.sol';
import './crowdsale/GNITokenCrowdsale.sol';
import './InvestorList.sol';
import './ContractStub.sol';

contract DividendsStub is Dividends, ContractStub {
  using SafeMath for uint256;

  constructor (Token token_, address developer_, InvestorList investorList_) public
  Dividends(token_, developer_, investorList_) {}

  function distributeDividend(address account) public returns (bool) {
    CallData storage methodState = method['distributeDividend'];
    methodState.called = true;
    methodState.firstAddress = account;
    return true;
  }
}
