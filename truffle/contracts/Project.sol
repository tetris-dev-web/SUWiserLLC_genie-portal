pragma solidity ^0.4.23;
import './utility/SafeMath.sol';

contract Project {
  using SafeMath for uint256;
  //these will all need to be private so they cannot be set arbitrarily
  //we'll make read methods when necessary
  string private name;
  address private developer;
  address public dividendWallet;
  uint256 internal closingTime;
  uint256 private valuation;
  uint256 private capitalRequired;
  uint256 private developerTokens;
  uint256 private investorTokens;
  string public lat;
  string private lng;
  uint256 internal totalVotes;
  bool public active;
  uint256 public activationTime;
  constructor (
    string _name,
    address _developer,
    address _dividendWallet,
    uint256 _valuation,
    uint256 _capitalRequired,
    uint256 _developerTokens,
    uint256 _investorTokens,
    string _lat,
    string _lng
    ) public {
      name = _name;
      developer = _developer;
      dividendWallet = _dividendWallet;
      valuation = _valuation;
      capitalRequired = _capitalRequired;
      developerTokens = _developerTokens;
      investorTokens = _investorTokens;
      lat = _lat;
      lng = _lng;
      totalVotes = 0;
      active = false;
      closingTime = now + 86600 * 240;
  }
  event LogProject (
      address addr,
      string name,
      uint256 valuation,
      uint256 capitalRequired,
      uint256 developerTokens,
      uint256 investorTokens,
      string lat,
      string lng,
      uint256 totalVotes,
      bool active
  );

  event VoteChange (
    address addr,
    string name,
    uint256 totalVotes
  );

  event ProjectActivation (
    address addr,
    string name,
    bool activationStatus,
    uint256 capitalRequired,
    uint256 valuation
  );

  mapping(address => uint256) internal votes;

  function votesOf(address voter) public view returns (uint256) {
    return votes[voter];
  }

  function log () public {
    emit LogProject(address(this), name, valuation, capitalRequired, developerTokens, investorTokens, lat, lng, totalVotes, active);
  }

  function open () public view returns (bool) {
    return closingTime > now;
  }

  /* function id_ () public view returns (uint256) {
    return id;
  } */
  function name_ () public view returns (string) {
    return name;
  }

  function active_ () public view returns (bool) {
    return active;
  }

  function activationTime_ () public view returns (uint256) {
    return activationTime;
  }

  function totalVotes_ () public view returns (uint256) {
    return totalVotes;
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
          totalVotes,
          closingTime
      );
  } */

  mapping(address => bool) internal managers;

  modifier authorize () {
    require(managers[msg.sender] == true || msg.sender == developer);
    _;
  }

  function deposit () public payable {
    require(msg.value != 0);
    uint256 weiAmount = msg.value;
    dividendWallet.transfer(weiAmount);
  }

  function addManager (address manager) public authorize {
    managers[manager] = true;
  }

  function setDividendWallet (address wallet) public authorize {
    dividendWallet = wallet;
  }
  //for security, we will make this contract owned by GNITokenCrowdsale and require that msg.sender is the owner for update and activate
  function vote (address voter, uint256 voteAmount) external {
    //maybe require that its open and not active
    votes[voter] = votes[voter].add(voteAmount);
    totalVotes = totalVotes.add(voteAmount);
    closingTime = closingTime.add(43200);

    emit VoteChange(address(this), name, totalVotes);
  }

  //for security, we will make this contract owned by GNITokenCrowdsale and require that msg.sender is the owner for update and activate
  function removeVotes (address voter, uint256 voteAmount) external {
    require(voteAmount <= totalVotes);
    require(voteAmount <= votes[voter]);

    votes[voter] = votes[voter].sub(voteAmount);
    totalVotes = totalVotes.sub(voteAmount);
    closingTime = closingTime.sub(43200);

    emit VoteChange(address(this), name, totalVotes);
  }

  function activate () external {
    active = true;
    //we should set totalVotes to 0
    activationTime = now;
    emit ProjectActivation(address(this), name, active, capitalRequired, valuation);
  }

  function beats (address otherProject) public view returns (bool) {
    return totalVotes > 0 && totalVotes >= Project(otherProject).totalVotes_();
      /* open() && *///we dont need this if we remove all votes for projects that are closed
      /* totalVotes >= Project(otherProject).totalVotes_() */
      //we dont need to check if the competitor is active because an active project always has 0 votes
  }
}
