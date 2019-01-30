pragma solidity >=0.4.22 <0.6.0;
import './utility/SafeMath.sol';
import './token/ERC20/Token.sol';
import './crowdsale/GNITokenCrowdsale.sol';

contract Dividends {
  using SafeMath for uint256;
  Token token;
  address  developer;

  constructor (Token token_, address  developer_) public {
    token = token_;
    developer = developer_;
  }

  mapping(address => uint256) public lastDividendPoints;

  uint256 public totalDividendPoints;
  uint256 internal pointMultiplier = 10e30;

  function dividendOwedTo(address  account) internal view returns (uint256) {
    uint256 owedDividendPoints = totalDividendPoints.sub(lastDividendPoints[account]);
    uint256 accountTokens = Token(token).activeBalanceOf(account);
    return accountTokens.mul(owedDividendPoints).div(pointMultiplier);
  }

  function distributeDividend(address  account) external returns (bool) {
    uint256 dividend = dividendOwedTo(account);
    account.transfer(dividend);
    lastDividendPoints[account] = totalDividendPoints;
    return true;
  }

  function receiveDividends () external payable {
    uint256 totalTokens = Token(token).totalActiveSupply();
    uint256 weiAmount = msg.value;

    uint256 newDividendPoints = weiAmount.mul(pointMultiplier).div(totalTokens);
    totalDividendPoints = totalDividendPoints.add(newDividendPoints);
  }
}
