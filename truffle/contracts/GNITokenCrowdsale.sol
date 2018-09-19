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
            /* wallet = this; */
        }

        function pitchProject() {

        }
}
