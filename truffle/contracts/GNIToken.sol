pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract xFitToken is MintableToken {
  using SafeMath for uint256;

  string public name = "GNIToken";
  string public symbol = "GNI";
  uint256 public decimals = 18;
  uint256 public pinTracker = 1034;
  mapping (uint256 => TokenInfo) public pinInfo;
  mapping (address => uint256) public pinHolder;

  struct TokenInfo {
      string tokenName;
      address tokenOwner;
      string projectVotedFor;
      address projectVotedForOwner;
      uint256 lastCheckIn;
  }

  // If the user is calling from our site, they will pass in a new name
  function transferFrom(string _newTokenName, address _from, address _to, uint256 _value) public returns (bool) {
    super.transferFrom(_from, _to, _value);
    uint256 pin = updatePinOwner(_from, _to);
    updateTokenName(_newTokenName, pin);
  }

  // If the user is calling from a 3rd party, the name will remain the same
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    super.transferFrom(_from, _to, _value);
    updatePinOwner(_from, _to);
  }

  // needs to remain public
  function assignPin(string _newTokenName, address _beneficiary, string _location, address _projectVotedForOwner) public returns (uint256) {
    // need to find out how to make this interanl and still work from crowdsale
    // maybe require balanceOf[msg.sender] > 1;
    // require that the pin for msg.sender is 0 ie it has just been created

    pinTracker = pinTracker.add(1);
    while(!(pinInfo[pinTracker].tokenOwner == 0x0000000000000000000000000000000000000000)){
        pinTracker = pinTracker.add(1);
    }

    TokenInfo memory newToken = TokenInfo({
      projectVotedForOwner:_projectVotedForOwner,
      tokenName: _newTokenName,
      tokenOwner: _beneficiary,
      projectVotedFor: _location,
      lastCheckIn: 0
    });

    pinHolder[_beneficiary] = pinTracker;
    pinInfo[pinTracker] = newToken;

    return pinTracker;
  }

  // change to internal
  function updatePinOwner(address _originalOwner, address _newOwner) public returns (uint256) {
    // retrieve pin
    uint256 pin = pinHolder[_originalOwner];

    // remove previous owner
    pinHolder[_originalOwner] = 0;

    // add new owner to pin mapping
    pinHolder[_newOwner] = pin;

    // update pinInfo
    // require(pinInfo[pin].tokenOwner);
    pinInfo[pin].tokenOwner = _newOwner;
    pinInfo[pin].lastCheckIn = 0;

    return pin;
  }

  // change to internal
  function updateTokenName(string _newTokenName, uint256 _pin) public {
    pinInfo[_pin].tokenName = _newTokenName;
  }

  function changePin(uint256 _currentPin, uint256 _newPin, string _tokenName) public returns(string){
    if (!(pinInfo[_newPin].tokenOwner == 0x0000000000000000000000000000000000000000)){
        return "pin is already in user";
    }
    if (pinHolder[msg.sender] != _currentPin || keccak256(abi.encodePacked(pinInfo[_currentPin].tokenName)) != keccak256(abi.encodePacked(_tokenName))){
        return "incorrect credentials supplied";
    }
    pinHolder[msg.sender] = _newPin;
    pinInfo[_newPin] = pinInfo[_currentPin];
    pinInfo[_currentPin].tokenOwner = 0x0000000000000000000000000000000000000000;
    return "pin successfully updated";
  }

  function checkInUserCheck(uint256 _pin, string _tokenName) public view returns (string) {
    // checks in user
      // returns:
      //   "already visitor": if the user has already checked in within 24 hours
      //   "invalid": if the pin and name do not match
      //   "success visitor": for successful check in at visitor gym (+ update timestamp)
      //   "success home": for successful check in at home gym (+ no update timestamp)
    TokenInfo storage tokenInfo = pinInfo[_pin];
    if (keccak256(abi.encodePacked(tokenInfo.tokenName)) == keccak256(abi.encodePacked(_tokenName))){
      if (tokenInfo.projectVotedForOwner == msg.sender){
        return "success home";
      } else if (tokenInfo.lastCheckIn.add(86400) < now || tokenInfo.lastCheckIn == 0) {
        return "success visitor";
      } else {
        return "already visitor";
      }
    } else {
      return "invalid";
    }
  }

  function updateUserTimestamp(uint256 _pin) public {
    //removed , string _tokenName parameter
    TokenInfo storage tokenInfo = pinInfo[_pin];
    tokenInfo.lastCheckIn = now;
    pinInfo[_pin] = tokenInfo;
  }

  // add a requirement that the caller is the owner
  // or better yet, remove _beneficiary and use msg.sender
  function getTokenInfo(address _beneficiary) public view returns(
        string, string, uint256
    ) {
        TokenInfo memory userTokenInfo = pinInfo[pinHolder[_beneficiary]];
        return (
            userTokenInfo.tokenName,
            userTokenInfo.projectVotedFor,
            pinHolder[_beneficiary]
        );
    }

  function getAllowedInfo(address _from, address _sender) public view returns (uint256) {
    return allowed[_from][_sender];
  }

}
