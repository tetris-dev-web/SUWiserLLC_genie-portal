pragma solidity 0.4.24;

import '../token/GNIToken.sol';
import "../token/ERC20/ERC20.sol";
import "../token/ERC20/SafeERC20.sol";
import '../utility/SafeMath.sol';

//maybe this should be a library?
contract Token {
  using SafeMath for uint256;
  using SafeERC20 for ERC20;
  /* uint256 internal investorCount_; */
  GNIToken public inactiveToken_;
  GNIToken public activeToken_;

  constructor () public {
      inactiveToken_ = new GNIToken();
      activeToken_ = new GNIToken();
      investorCount_ = 0;
  }

  /* mapping(uint256 => address) internal investors;
  mapping(address => uint256) internal investorIds; */
  /* mapping (address => Balance) internal balances; */

  //we will delete this later....only using for development purposes
  /* function investorById(uint256 id) public view returns (address) {
    return investors[id];
  } */

  //we probably wont need this either...only for development
  /* function investorCount() public view returns (uint256) {
    return investorCount_;
  } */

  function genesis (address _to, uint256 _amount) public returns (bool) {
    GNIToken(inactiveToken_).mint(_to, _amount);
  }

  function terminus (address _from, uint256 _amount) public returns (bool) {
    GNIToken(activeToken_).burnFrom(_from, _amount);
  }

  function processPurchase (address _to, address _from, uint256 tokens) public {
    GNIToken(inactiveToken_).transferFrom(_from, _to, tokens);
    /* addInvestor(beneficiary); */
  }

  /* function addInvestor (address investor) private {
    if (investorIds[investor] == 0) {
      investorCount_ = investorCount_.add(1);
      investors[investorCount_] = investor;
      investorIds[investor] = investorCount_;
    }
  } */
  //for security, we will make this contract owned by GNITokenCrowdsale and require that msg.sender is the owner
  /* function activateTokens (uint256 developerTokens, uint256 investorTokens, address developer) public {
    /* convert(this, developer, developerTokens); */
    /* GNIToken(inactiveToken_).burnFrom(developer, developerTokens);
    GNIToken(activeToken_).mint(developer, developerTokens);
    activateInvestorTokens(investorTokens);
  } */

  /* function activateInvestorTokens (uint256 tokens) private {
    uint256 activationDivisor = findActivationDivisor(tokens);

    for (uint256 i = 1; i <= investorCount_; i = i.add(1)) {
      address investor = investors[i];
      uint256 tokensToActivate = GNIToken(inactiveToken_).balanceOf(investor).div(activationDivisor);

      activate(investor, tokens);
    }
  } */

  //make all of the methods secure by making it owned by the crowdsale and add an only owner modifier.
  function findActivationDivisor (uint256 tokens, address wallet) external returns (uint256) {
    uint256 supply = GNIToken(inactiveToken_).totalSupply().sub(GNIToken(inactiveToken_).balanceOf(wallet));
    return supply.div(tokens);
  }

  function tokensToActivate (address investor, uint256 activationDivisor) external returns (uint256) {
    return GNIToken(inactiveToken_).balanceOf(investor).div(activationDivisor);
  }

  function totalActive () public returns (uint256) {
    return GNIToken(activeToken_).totalSupply_();
  }

  function activeOf (address investor) public returns (uint256) {
    return GNIToken(activeToken_).balanceOf(investor);
  }

  function activate (address _investor, uint256 _amount) external {
    GNIToken(inactiveToken_).burnFrom(_investor, _amount);
    GNIToken(activeToken_).mint(_investor, _amount);
  }
}
