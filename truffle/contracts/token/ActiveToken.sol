pragma solidity >=0.4.22 <0.6.0;
/* import './ERC20Base.sol'; */
import './IERC20.sol';
import '../dividends/Dividends.sol';
import '../utility/Ownable.sol';
import './VotingToken.sol';

contract ERC20Base is IERC20 {
    using SafeMath for uint256;
    VotingToken public votingToken;

    constructor (VotingToken _votingToken) public {
      votingToken = VotingToken(_votingToken);
    }

    mapping (address => uint256) internal _balances;

    mapping (address => mapping (address => uint256)) internal _allowed;

    uint256 internal _totalSupply;


    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }


    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }


    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowed[owner][spender];
    }


    function transfer(address to, uint256 value) public returns (bool) {
        require(votingToken.freedUpBalanceOf(to) >= value);
        _transfer(msg.sender, to, value);
        return true;
    }


    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }


    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        _transfer(from, to, value);
        _approve(from, msg.sender, _allowed[from][msg.sender].sub(value));
        return true;
    }


    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowed[msg.sender][spender].add(addedValue));
        return true;
    }


    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowed[msg.sender][spender].sub(subtractedValue));
        return true;
    }


    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0));

        _balances[from] = _balances[from].sub(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(from, to, value);
    }


    function _mint(address account, uint256 value) internal {
        require(account != address(0));

        _totalSupply = _totalSupply.add(value);
        _balances[account] = _balances[account].add(value);
        emit Transfer(address(0), account, value);
    }


    function _burn(address account, uint256 value) internal {
        require(account != address(0));

        _totalSupply = _totalSupply.sub(value);
        _balances[account] = _balances[account].sub(value);
        emit Transfer(account, address(0), value);
    }


    function _approve(address owner, address spender, uint256 value) internal {
        require(spender != address(0));
        require(owner != address(0));

        _allowed[owner][spender] = value;
        emit Approval(owner, spender, value);
    }
}

contract ActiveToken is ERC20Base, Ownable {
  Dividends public dividendWallet;
  address public minter;
  //we need to distribute dividends in the transfer function

  constructor (VotingToken _votingToken) public
  ERC20Base(_votingToken) {
  }

  function setDividendWallet(address _dividendWallet) external onlyOwner {
    dividendWallet = Dividends(_dividendWallet);
  }

  function setMinter(address _minter) external onlyOwner {
    minter = _minter;
  }

  modifier onlyMinter () {
    require(msg.sender == minter);
    _;
  }

  function mint (address account, uint256 value) external onlyMinter {
    dividendWallet.distributeDividend(account);
    _mint(account, value);
  }

  function transfer 
}
