pragma solidity 0.4.24;
import './Dividends.sol';

contract DividendsMock is Dividends {

  function init (address dev) public {
    developer = dev;
  }
}
