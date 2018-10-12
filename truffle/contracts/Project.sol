pragma solidity ^0.4.23;

contract Project {
  string name;
  address manager;
  uint256 closingTime;
  uint256 valuation;
  uint256 capitalRequired;
  uint256 developerTokens;
  uint256 investorTokens;
  string lat;
  string lng;
  uint256 voteCount;
  bool active;
  address escrow;

  constructor (
    string _name,
    address _manager,
    uint256 _closingTime,
    uint256 _valuation,
    uint256 _capitalRequired,
    uint256 _developerTokens,
    uint256 _investorTokens,
    string _lat,
    string _lng,
    uint256 _voteCount,
    bool _active
    ) public {
      name = _name;
      manager = _manager;
      closingTime = _closingTime;
      valuation = _valuation;
      capitalRequired = _capitalRequired;
      developerTokens = _developerTokens;
      investorTokens = _investorTokens;
      lat = _lat;
      lng = _lng;
      voteCount = _voteCount;
      active = _active;
  }

  function deposit () public payable {
    require(msg.value != 0);
  }

  function forwardToEscrow (uint256 _amount) public {
    require(msg.sender == manager);
    escrow.transfer(_amount);
  }
}
