pragma solidity 0.4.25;
import './Dividends.sol';

contract DividendsMock is Dividends {

  function init (address dev) public {
    developer = dev;
  }
}
