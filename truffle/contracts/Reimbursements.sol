pragma solidity ^0.4.24;

import './token/ERC20/Token.sol';
import './utility/SafeMath.sol';
import './utility/Ownable.sol';
import './crowdsale/GNITokenCrowdsale';

contract Reimbursements is Ownable {
  using SafeMath for uint256;
  uint256 public inactiveTokensAtClosing;
  uint256 public weiToReimburse;
  Token public token;
  address public crowdsale;

  constructor (Token _token address crowdsale) payable {
    token = _token;
  }

  function () public payable {}
  //this needs to be only accessible by crowdsal
  function recordReimbursement () public payable onlyOwner {
    inactiveTokensAtClosing = Token(token).totalInactiveSupply().sub(Token(token).totalPendingActivations());
    weiToReimburse = msg.value;
  }

  function claimReimbursement (address account) public {
    require(weiToReimburse != 0 && address(this).balance != 0);
    uint256 inactiveTokens = Token(token).inactiveBalanceOf(account);
    uint256 pendingActivations = Token(token).pendingActivations(account);
    uint256 accountTokens = inactiveTokens.sub(pendingActivations);
    uint256 reimbursement = weiToReimburse.mul(accountTokens).div(inactiveTokensAtClosing);
    account.transfer(reimbursement);

    if (address(this.balance) == 0) {
      weiToReimburse = 0;
      GNITokenCrowdsale(crowdsale).allowReOpening();
    }
  }
}
