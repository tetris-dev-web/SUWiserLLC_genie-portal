pragma solidity >=0.4.22 <0.6.0;
import './utility/Ownable.sol'
import './utility/SafeMath.sol';
import './AmendmentPoll.sol';
import './token/ActiveToken.sol';

contract AmendmentPollStub is AmendmentPoll {
  constructor (ActiveToken _token) public AmendmentPoll(_token){}
}
