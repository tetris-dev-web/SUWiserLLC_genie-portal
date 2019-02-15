pragma solidity >=0.4.22 <0.6.0;
import './utility/SafeMath.sol';

contract Cooperative is Ownable {
  uint256 public developer;

  constructor (address _developer) public {
    developer = _developer;
  }

  bool public migrationsComplete;

  uint256 public totalAmendmentCount;
  mapping(uint256 => Amendment) public amendmentById;

  function completeMigrations () external onlyOwner {
    migrationsComplete = true;
  }

  function migrateAmendment (Amendment amendment) onlyOwner {
    require(!initializationComplete);
    totalAmendmentCount = totalAmendmentCount.add(1);
    amendmentById[totalAmendmentCount] = amendment;
  }
}
