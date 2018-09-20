pragma solidity 0.4.24;

import './GNIToken.sol';
import 'openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract GNITokenCrowdsale is TimedCrowdsale, CappedCrowdsale,  MintedCrowdsale {
    using SafeMath for uint256;

    constructor
        (
          uint256 _openingTime,
          uint256 _closingTime,
          uint256 _rate,
          address _wallet,
          uint256 _cap,
          MintableToken _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _closingTime) {
            // rewriting wallet to this will not work in contructor
            wallet = this;
        }



        /**
         * @dev pitching a project to raise cap
         * @param _projectValue - value of total project
         */
         // TODO make ownable
         // TODO
        function pitchProjectandRaiseCap(uint256 _projectValue) public {
          uint newTokensIssued = 1000;
          GNIToken(token).mint(wallet, newTokensIssued);
          uint updatedTotalSupply = GNIToken(token).totalSupply();
          cap = cap.add(_projectValue);
          uint newRate = cap/updatedTotalSupply;
          rate = newRate;
        }
}
