pragma solidity ^0.4.24;

import './token/ERC20/Token.sol';
import './utility/SafeMath.sol';

contract Reimbursements {
  using SafeMath for uint256;
  uint256 public inactiveTokensAtClosing;
  uint256 public weiToReimburse;
  Token public token;

  constructor (Token _token) {
    token = _token;
  }

  //this needs to be only accessible by crowdsale
  function () public payable {
    inactiveTokensAtClosing = Token(token).totalInactiveSupply().sub(Token(token).totalPendingActivations());
    weiToReimburse = msg.value;
  }

  function claimReimbursement (address account) public {
    require(weiToReimburse != 0);
    uint256 inactiveTokens = Token(token).inactiveBalanceOf(account);
    uint256 pendingActivations = Token(token).pendingActivations(account);
    uint256 accountTokens = inactiveTokens.sub(pendingActivations);
    uint256 reimbursement = weiToReimburse.mul(accountTokens).div(inactiveTokensAtClosing);
    account.transfer(reimbursement);
  }
}
