pragma solidity 0.4.24;

import '../token/ERC20/MintableToken.sol';
import "../token/ERC20/ERC20.sol";
import "../token/ERC20/SafeERC20.sol";
import '../utility/SafeMath.sol';

contract Token {
  using SafeMath for uint256;
  using SafeERC20 for ERC20;
  uint256 internal investorCount_;
  ERC20 inactiveToken_;
  ERC20 activeToken_;

  constructor (
    MintableToken inactiveToken,
    MintableToken activeToken
    ) public {
      inactiveToken_ = inactiveToken;
      activeToken_ = activeToken;
      investorCount = 0;
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

  function processPurchase (beneficiary, tokens) public {
    require(inactiveToken_.safeTransfer(beneficiary, tokens));

    if (investorIds[beneficiary] == 0) {
      investorCount_ = investorCount_.add(1);
      investors[investorCount_] = beneficiary;
      investorIds[beneficiary] = investorCount_;
    }
  }

  function genesis (address _to, uint256 _amount) public returns (bool) {
    MintableToken(inactiveToken_).mint(_to, _amount);
  }

  function activateTokens (uint256 developerTokens, uint256 investorTokens, address developer) public {
    activateDeveloperTokens(developerTokens, developer);
    activateInvestorTokens(investorTokens);
  }

  function activateDeveloperTokens (uint256 tokens, address developer, address crowdsale) private {
    MintableToken(inactiveToken_).burn(msg.sender, tokens);
    MintableToken(activeToken_).mint(developer, tokens);
  }

  function activateInvestorTokens (uint256 tokens) private {
    uint256 supply = MintableToken(inactiveToken_).totalSupply().sub(MintableToken(inactiveToken_).balanceOf(msg.sender));
    uint256 activationDivisor = supply.div(tokens);

    for (uint256 i = 1; i <= investorCount_; i = i.add(1)) {
      address investor = investors[i];
      uint256 tokensToActivate = MintableToken(inactiveToken_).balanceOf(investor).div(activationDivisor);

      MintableToken(inactiveToken_).burn(investor, tokens);
      MintableToken(activeToken).mint(investor, tokens);
    }
  }
}
