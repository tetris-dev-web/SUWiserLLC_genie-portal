pragma solidity 0.4.24;

import '../token/GNIToken.sol';
import "../token/ERC20/ERC20.sol";
import "../token/ERC20/SafeERC20.sol";
import '../utility/SafeMath.sol';

contract Token {
  using SafeMath for uint256;
  using SafeERC20 for ERC20;
  uint256 internal investorCount_;
  GNIToken inactiveToken_;
  GNIToken activeToken_;

  constructor () public {
      inactiveToken_ = new GNIToken();
      activeToken_ = new GNIToken();
      investorCount_ = 0;
  }

  mapping(uint256 => address) internal investors;
  mapping(address => uint256) internal investorIds;
  /* mapping (address => Balance) internal balances; */

  function investorCount() public view returns (uint256) {
    return investorCount_;
  }

  function investorById(uint256 id) public view returns (address) {
    return investors[id];
  }

  function processPurchase (address beneficiary, uint256 tokens) public {
    require(GNIToken(inactiveToken_).transfer(beneficiary, tokens));

    if (investorIds[beneficiary] == 0) {
      investorCount_ = investorCount_.add(1);
      investors[investorCount_] = beneficiary;
      investorIds[beneficiary] = investorCount_;
    }
  }

  function genesis (uint256 _amount) public returns (bool) {
    GNIToken(inactiveToken_).mint(this, _amount);
  }

  function terminus (address _from, uint256 _amount) public returns (bool) {
    GNIToken(activeToken_).burn(_amount);
  }

  function activateTokens (uint256 developerTokens, uint256 investorTokens, address developer) public {
    activateDeveloperTokens(developerTokens, developer);
    activateInvestorTokens(investorTokens);
  }

  function activateDeveloperTokens (uint256 tokens, address developer) private {
    GNIToken(inactiveToken_).burn(tokens);
    GNIToken(activeToken_).mint(developer, tokens);
  }

  function activateInvestorTokens (uint256 tokens) private {
    uint256 supply = GNIToken(inactiveToken_).totalSupply().sub(GNIToken(inactiveToken_).balanceOf(this));
    uint256 activationDivisor = supply.div(tokens);

    for (uint256 i = 1; i <= investorCount_; i = i.add(1)) {
      address investor = investors[i];
      uint256 tokensToActivate = GNIToken(inactiveToken_).balanceOf(investor).div(activationDivisor);

      GNIToken(inactiveToken_).burnFrom(investor, tokens);
      GNIToken(activeToken_).mint(investor, tokens);
    }
  }
}
