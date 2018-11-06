pragma solidity ^0.4.23;
import './utility/SafeMath.sol';
contract Project {
  using SafeMath for uint256;
  //these will all need to be private so they cannot be set arbitrarily
  //we'll make read methods when necessary
  uint256 public id; //this should be public?
  string public name;
  address public developer;
  address public dividends;
  uint256 public closingTime;
  uint256 public valuation;
  uint256 public capitalRequired;
  uint256 public developerTokens;
  uint256 public investorTokens;
  string public lat;
  string public lng;
  uint256 public voteCount;
  bool public active;
  constructor (
    uint256 _id,
    string _name,
    address _developer,
    uint256 _valuation,
    uint256 _capitalRequired,
    uint256 _developerTokens,
    uint256 _investorTokens,
    string _lat,
    string _lng
    ) public {
      id = _id;
      name = _name;
      developer = _developer;
      valuation = _valuation;
      capitalRequired = _capitalRequired;
      developerTokens = _developerTokens;
      investorTokens = _investorTokens;
      lat = _lat;
      lng = _lng;
      voteCount = 0;
      active = false;
      closingTime = now + 86600 * 240;
  }
  event LogProject (
      uint id,
      string name,
      uint256 valuation,
      uint256 capitalRequired,
      uint256 developerTokens,
      uint256 investorTokens,
      string lat,
      string lng,
      uint256 voteCount,
      bool active
  );
  function log () public {
    emit LogProject(id, name, valuation, capitalRequired, developerTokens, investorTokens, lat, lng, voteCount, active);
  }
  function open () public view returns (bool) {
    return closingTime > now;
  }
  function active_ () public view returns (bool) {
    return active;
  }
  function voteCount_ () public view returns (uint256) {
    return voteCount;
  }
  function closingTime_ () public view returns (uint256) {
    return closingTime;
  }
  function developerTokens_ () public view returns (uint256) {
    return developerTokens;
  }
  function investorTokens_ () public view returns (uint256) {
    return investorTokens;
  }
  function capitalRequired_ () public view returns (uint256) {
    return capitalRequired;
  }
  /* function getInfo() public view returns(
      string, uint256, uint256, uint256, uint256, bool, uint256, uint256
      ) {
      return (
          name,
          valuation,
          capitalRequired,
          developerTokens,
          investorTokens,
          active,
          voteCount,
          closingTime
      );
  } */
  mapping(address => bool) managers;
  modifier authorize () {
    require(managers[msg.sender] == true || msg.sender == developer);
    _;
  }

  function deposit () public payable {
    require(msg.value != 0);
    uint256 weiAmount = msg.value;
    dividends.transfer(weiAmount);
  }

  function addManager (address manager) public authorize {
    managers[manager] = true;
  }

  function setDividendWallet (address wallet) public authorize {
    dividends = wallet;
  }
  //for security, we will make this contract owned by GNITokenCrowdsale and require that msg.sender is the owner for update and activate
  function vote (uint256 votes) external {
    voteCount = voteCount.add(votes);
    closingTime = closingTime.add(43200);
  }

  //for security, we will make this contract owned by GNITokenCrowdsale and require that msg.sender is the owner for update and activate
  function removeVotes (uint256 votes) external {
    require(votes <= voteCount);
    voteCount = voteCount.sub(votes);
  }

  function activate () external {
    active = true;
    log();
  }

  function beats (address otherProject) external view returns (bool) {
    return (
      !active &&
      voteCount > 0 &&
      open() &&
      (voteCount >= Project(otherProject).voteCount_()) || Project(otherProject).active_()
    );
  }
}
