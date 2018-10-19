pragma solidity ^0.4.24;
import './GNIToken.sol';

library TokenActivator {
  /* function findActivationDivisor (
    GNIToken token,
    uint256 amount,
    address developer
    )
    external returns (uint256)
  {
    uint256 supply = token.totalSupply().sub(token.balanceOf(wallet));
    return supply.div(amount);
  }

  function tokensToActivate (
    GNIToken token,
    address investor,
    uint256 activationDivisor
    )
    external returns (uint256)
  {
    return token.balanceOf(investor).div(activationDivisor);
  }


  function activate (
    GNIToken inactiveToken,
    GNIToken activeToken,
    address _investor,
    uint256 _amount
    )
    external
  {
    inactiveToken.burnFrom(_investor, _amount);
    activeToken.mint(_investor, _amount);
  } */
}
