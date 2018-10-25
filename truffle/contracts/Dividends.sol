pragma solidity 0.4.24;
import './utility/SafeMath.sol';
import './token/ERC20/ActiveToken.sol';
import './crowdsale/GNITokenCrowdsale.sol';
import './utility/SharedStructs.sol';


contract Dividend {
  using SafeMath for uint256;
  ActiveToken token;
  GNITokenCrowdsale crowdsale;
  address developer;
  SharedStructs.Investor Investor;

  constructor (ActiveToken token_, GNITokenCrowdsale crowdsale_, address developer_) {
    token = token_;
    crowdsale = crowdsale_;
    developer = developer_;
  }

  function distributeDividends () external {
    //store the total amount of wei in a variable
    //iterate through each investor.
    //divide the total active tokens by the number of active investor tokens.
    //divide the total wei by the resulting number to find out how much to wei to transfer

    uint256 activeTokens = ActiveToken(token).totalSupply();
    uint256 profits = address(this).balance;
    Investor[] investors = GNITokenCrowdsale(crowdsale).investors();

    for (uint256 i = 0; i < investors.length; i = i.add(1)) {
      grantDividend(investors[i].addr, activeTokens, profits);
    }

    grantDividend(developer, activeTokens, profits);
  }

  function grantDividend (address investor, uint256 activeTokens, uint256 profits) private {
    uint256 investorActive = ActiveToken(token).balanceOf(investor);
    uint256 investorShare = activeTokens.div(investorActive);
    uint256 dividend = profits.div(investorShare);
    investor.transfer(dividend);
  }
}
