pragma solidity ^0.4.24;
import './utility/SafeMath.sol';
import './token/ERC20/Token.sol';
import './crowdsale/GNITokenCrowdsale.sol';


contract Dividends {
  using SafeMath for uint256;
  Token token;
  InvestorList investorList;
  address developer;

  constructor (Token token_, address developer_, InvestorList investorList_) public {
    token = token_;
    developer = developer_;
    investorList = InvestorList(investorList_);
  }

  mapping(address => uint256) lastDividendPoints;

  uint256 totalDividendPoints;
  uint256 private pointMultiplier = 10e18;

  function dividendOwedTo(address account) internal view returns (uint256) {
    uint256 owedDividendPoints = totalDividendPoints.sub(lastDividendPoints[account]);
    uint256 accountTokens = Token(token).activeBalanceOf(account);
    return accountTokens.mul(owedDividendPoints).div(pointMultiplier);
  }

  function grantDividend(address account) internal returns (bool) {
    uint256 dividend = dividendOwedTo(account);
    account.transfer(dividend);
    lastDividendPoints[account] = totalDividendPoints;
    return true;
  }

  //this function needs to update
  function () external payable {
    uint256 totalTokens = Token(token).totalActiveSupply();
    uint256 weiAmount = msg.value;

    uint256 newDividendPoints = weiAmount.mul(pointMultiplier).div(totalTokens);
    totalDividendPoints = totalDividendPoints.add(newDividendPoints);
  }
/*
  function distributeDividends () external {
    uint256 activeTokens = Token(token).totalActiveSupply();
    uint256 profits = address(this).balance; //give this an arbitrary profit in the test file

    for (uint256 i = 1; i <= investorList.investorCount(); i = i.add(1)) {
      grantDividend(investorList.addrById(i), activeTokens, profits);
      //addr by id can return mock addresses that we set in the stub
    }

    grantDividend(developer, activeTokens, profits);
    //we set an arbitrary developer in the mock
  }

  function grantDividend (address investor, uint256 activeTokens, uint256 profits) private {
    uint256 investorActive = Token(token).activeBalanceOf(investor); //we return an arbitrary amount less that total in the stub
    uint256 dividend = profits.mul(investorActive).div(activeTokens);
    investor.transfer(dividend);
  } */


}
