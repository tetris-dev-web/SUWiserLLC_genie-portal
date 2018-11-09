pragma solidity 0.4.25;
import './utility/SafeMath.sol';
import './token/ERC20/Token.sol';
import './crowdsale/GNITokenCrowdsale.sol';


contract Dividends {
  using SafeMath for uint256;
  Token token;
  GNITokenCrowdsale crowdsale;
  InvestorList investorList;
  address developer;

  constructor (Token token_, GNITokenCrowdsale crowdsale_, address developer_, InvestorList investorList_) public {
    token = token_;
    developer = developer_;
    crowdsale = GNITokenCrowdsale(crowdsale_);
    investorList = InvestorList(investorList_);
  }

  function () external payable {}

    //store the total amount of wei in a variable
    //iterate through each investor.
    //divide the total active tokens by the number of active investor tokens.
    //divide the total wei by the resulting number to find out how much to wei to transfer
  function distributeDividends () external {
    uint256 activeTokens = Token(token).totalActiveSupply();
    uint256 profits = address(this).balance;

    for (uint256 i = 1; i <= investorList.investorCount(); i = i.add(1)) {
      grantDividend(investorList.addrById(i), activeTokens, profits);
    }

    grantDividend(developer, activeTokens, profits);
  }

  function grantDividend (address investor, uint256 activeTokens, uint256 profits) private {
    uint256 investorActive = Token(token).activeBalanceOf(investor);
    uint256 dividend = profits.mul(investorActive).div(activeTokens);
    investor.transfer(dividend);
  }
}
