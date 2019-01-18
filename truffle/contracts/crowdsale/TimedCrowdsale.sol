pragma solidity 0.4.24;

import '../utility/SafeMath.sol';
import "./Crowdsale.sol";


/**
 * @title TimedCrowdsale
 * @dev Crowdsale accepting contributions only within a time frame.
 */
contract TimedCrowdsale is Crowdsale {
  using SafeMath for uint256;

  uint256 public openingTime;
  uint256 public doomsDay;
  bool public canReOpen;
  address public reimbursements;
  /**
   * @dev Reverts if not in crowdsale time range.
   */
  modifier onlyWhileOpen {
    // solium-disable-next-line security/no-block-members
    /* uint timestamp = block.timestamp;
    uint time1 = openingTime;
    uint time2 = doomsDay; */
    require(block.timestamp >= openingTime && block.timestamp <= doomsDay);
    _;
  }

  modifier canExtendDoomsDay {
    /* uint timestamp = block.timestamp;
    uint time1 = openingTime;
    uint time2 = doomsDay; */
    require((block.timestamp >= openingTime && block.timestamp <= doomsDay) || canReOpen);
    _;
  }

  //can extend doomsDay....

  /**
   * @dev Constructor, takes crowdsale opening and closing times.
   * @param _openingTime Crowdsale opening time
   * @param _doomsDay Crowdsale closing time
   */
  constructor(uint256 _openingTime, uint256 _doomsDay, address _reimbursements) public {
    // solium-disable-next-line security/no-block-members
    require(_openingTime >= block.timestamp);
    require(_doomsDay >= _openingTime);

    openingTime = _openingTime;
    doomsDay = _doomsDay;
    reimbursements = _reimbursements;
  }

  /**
   * @dev Checks whether the period in which the crowdsale is open has already elapsed.
   * @return Whether crowdsale period has elapsed
   */
  function hasClosed() public view returns (bool) {
    // solium-disable-next-line security/no-block-members
    return block.timestamp > doomsDay;
  }

  //need tests for this
  function allowReOpening () external {
    require(msg.sender == reimbursements && hasClosed());
    canReOpen = true;
  }

  /**
   * @dev Extend parent behavior requiring to be within contributing period
   * @param _beneficiary Token purchaser
   * @param _weiAmount Amount of wei contributed
   */
  /* function _preValidatePurchase(
    address _beneficiary,
    uint256 _weiAmount
  )
    internal
    onlyWhileOpen
  {
    super._preValidatePurchase(_beneficiary, _weiAmount);
  } */

}
