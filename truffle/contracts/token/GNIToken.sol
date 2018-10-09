pragma solidity 0.4.24;

import '../token/ERC20/MintableToken.sol';
import '../utility/SafeMath.sol';

contract GNIToken is MintableToken {
  using SafeMath for uint256;
  uint256 internal inactiveInvestorSupply_;
  uint256 internal inactiveDeveloperSupply_;
  uint256 internal investorCount_;



  constructor() public {
    totalSupply_ = 0;
    inactiveInvestorSupply_ = 0;
    inactiveDeveloperSupply_ = 0;
    investorCount_ = 0;
    balances[msg.sender] = 0;
  }

  /* struct Balance {
    uint256 active;
    uint256 inactive;
  } */


  mapping(uint256 => address) internal investors;
  mapping(address => uint256) internal investorIds;
  /* mapping (address => Balance) internal balances; */
  mapping(address => uint256) internal activeBalances;


  function inactiveSupply() public view returns (uint256) {
    return inactiveSupply_;
  }

  function investorCount() public view returns (uint256) {
    return investorCount_;
  }

  function investorById(uint256 id) public view returns (address) {
    return investors[id];
  }

  function mint (address _to, uint256 _developerAmount, uint256 _investorAmount) public returns (bool) {
    uint256 _totalAmount = _developerAmount.add(_investorAmount);
    require(super.mint(_to, _totalAmount));

    inactiveDeveloperSupply_ = inactiveDeveloperSupply_.add(_developerAmount);
    inactiveInvestorSupply_ = inactiveInvestorSupply_.add(_investorAmount);
  }

  function transfer (address _to, uint256 _value) public returns (bool) {
    require(super.transfer(_to, _value));

    /* if (investorIds[msg.sender] == 0) {
      investorCount_ = investorCount_.add(1);
      investors[investorCount_] = msg.sender;
      investorIds[msg.sender] = investorCount_;
    } */

    if (investorIds[_to] == 0) {
      investorCount_ = investorCount_.add(1);
      investors[investorCount_] = _to;
      investorIds[_to] = investorCount_;
    }

    return true;
  }

  //for the number of paritipants...
  //find the balance of the investor
  //reduce the balance according to the activation rate
  //then, reduce the inactiveSupply according to the activation rate
  function activateTokens (uint256 developerTokens, uint256 investorTokens, address developer) public {
    activateDeveloperTokens(developerTokens, developer);
    activateInvestorTokens(investorTokens);
  }

  function activateDeveloperTokens (uint256 tokens, address developer) private {
    inactiveSupply_ = inactiveSupply_.sub(tokens);

    balances[developer] = balances[developer].sub(tokens);
    activeBalances[developer] = activeBalances[developer].add(tokens);
  }

  function activateInvestorTokens (uint256 tokens) private {
    uint256 activationDivisor = inactiveSupply_.div(tokens);

    for (uint256 i = 1; i <= investorCount_; i = i.add(1)) {
      address investor = investors[i];

      uint256 tokensToActivate = balances[investor].div(activationDivisor);

      balances[investor] = balances[investor].sub(tokensToActivate);
      activeBalances[investor] = activeBalances[investor].add(tokensToActivate);
    }

    inactiveSupply_ = inactiveSupply_.sub(tokens);
  }

  function balanceOf(address _owner) public view returns (uint256, uint256) {
    return (
      balances[_owner],
      activeBalances[_owner]
      );
    }
}


//make inactiveTokenSupply variable
//override mint. call super, and then perform logic to update inactiveTokenSupply

//override transfer. call super, nd then perform logic to store addresses (more below)
//make investorCount variable. It initializes at 1 and increments for every new address during transfers.
//make a mapping from investor id to address, storing the addresses in an array.
//use this mapping to get the balance of each investor
