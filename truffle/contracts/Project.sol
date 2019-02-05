pragma solidity >=0.4.22 <0.6.0;
import './utility/SafeMath.sol';
import './utility/Ownable.sol';
import './utility/Secondary.sol';
import './Dividends.sol';
/* import './ECRecovery.sol'; */

contract Project is Ownable, Secondary {
  using SafeMath for uint256;
  /* using ECRecovery for bytes32; */
  //these will all need to be private so they cannot be set arbitrarily
  //we'll make read methods when necessary
  string private title;
  address private developer;
  address public dividendWallet;
  uint256 internal closingTime;
  uint256 public valuation;
  uint256 private capitalRequired;
  uint256 private developerTokens;
  uint256 private investorTokens;
  string public lat;
  string private lng;
  uint256 internal totalVotes;
  bool public active;
  uint256 public activationTime;
  constructor (
    string memory _title,
    address _developer,
    address _dividendWallet,
    uint256 _valuation,
    uint256 _capitalRequired,
    uint256 _developerTokens,
    uint256 _investorTokens,
    string memory _lat,
    string memory _lng
    ) public
    {
      title = _title;
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
      string title,
      uint256 valuation,
      uint256 capitalRequired,
      uint256 developerTokens,
      uint256 investorTokens,
      string lat,
      string lng,
      uint256 totalVotes,
      bool active
  );

  mapping(address => uint256) internal votes;

  function votesOf(address voter) public view returns (uint256) {
    return votes[voter];
  }

  function log () public {
    emit LogProject(address(this), title, valuation, capitalRequired, developerTokens, investorTokens, lat, lng, totalVotes, active);
  }

  function open () public view returns (bool) {
    return closingTime > now;
  }

  /* function id_ () public view returns (uint256) {
    return id;
  } */
  function title_ () public view returns (string memory) {
    return title;
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
          title,
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

  function () external payable {}

  modifier authorize () {
    require(managers[msg.sender] == true || msg.sender == developer);
    _;
  }

  function deposit () public payable {
    require(msg.value != 0);
    uint256 weiAmount = msg.value;
    Dividends(dividendWallet).receiveDividends.value(weiAmount)();
  }

  function addManager (address manager) public authorize {
    managers[manager] = true;
  }

  function setDividendWallet (address wallet) public authorize {
    dividendWallet = wallet;
  }

  function vote (address voter, uint256 voteAmount) external onlyOwner {
    votes[voter] = votes[voter].add(voteAmount);
    totalVotes = totalVotes.add(voteAmount);
    closingTime = closingTime.add(43200);
  }

  function voteAgainst (address voter, uint256 voteAmount) external onlyOwner {
    removeVotes_(voter, voteAmount);
  }

  //when the project has closed
  function removeVotes (address voter, uint256 voteAmount) external onlyOwner {
    require(!open() || active);
    removeVotes_(voter, voteAmount);
  }

  function removeVotes_ (address voter, uint256 voteAmount) internal {
    require(voteAmount <= totalVotes);
    require(voteAmount <= votes[voter]);

    votes[voter] = votes[voter].sub(voteAmount);
    totalVotes = totalVotes.sub(voteAmount);
    closingTime = closingTime.sub(43200);//we need to handle the case that the project closed
  }

  function activate () external onlyPrimary returns(uint256) {
    active = true;
    //we should set totalVotes to 0
    activationTime = now;
    return activationTime;
  }
}
