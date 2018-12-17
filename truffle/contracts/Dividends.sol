pragma solidity 0.4.24;
import './utility/SafeMath.sol';
import './token/ERC20/Token.sol';
import './crowdsale/GNITokenCrowdsale.sol';
import './InvestorList.sol';

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

  mapping(address => uint256) public lastDividendPoints;

  uint256 public totalDividendPoints;
  uint256 internal pointMultiplier = 10e30;

  function dividendOwedTo(address account) internal view returns (uint256) {
    uint256 owedDividendPoints = totalDividendPoints.sub(lastDividendPoints[account]);
    uint256 accountTokens = Token(token).activeBalanceOf(account);
    return accountTokens.mul(owedDividendPoints).div(pointMultiplier);
  }

  function distributeDividend(address account) public returns (bool) {
    uint256 dividend = dividendOwedTo(account);
    account.transfer(dividend);
    lastDividendPoints[account] = totalDividendPoints;
    return true;
  }

  function () external payable {
    uint256 totalTokens = Token(token).totalActiveSupply();
    uint256 weiAmount = msg.value;

    uint256 newDividendPoints = weiAmount.mul(pointMultiplier).div(totalTokens);
    totalDividendPoints = totalDividendPoints.add(newDividendPoints);
  }
}
