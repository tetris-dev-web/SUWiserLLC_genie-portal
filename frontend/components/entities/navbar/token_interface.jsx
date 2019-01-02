import React from 'react';
import { connect } from 'react-redux';
import { fetchChainProjects } from '../../../actions/chain_actions/project_actions';
import UserDropdownContainer from './user_dropdown/user_dropdown_container';
import TransferModal from './transfer/transfer_modal';
import ProjectFormModal from './project_form/project_form_modal';

// import getWeb3 from './getWeb3.js';
// import TruffleContract from 'truffle-contract';
// import GenieToken from './GenieToken.json';
// import MultiSigWallet from './MultiSigWallet.json';

class TokenInterface extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0
    };
    this.watchTransfer = this.watchTransfer.bind(this);
    this.test = this.test.bind(this);
    this.pitchProjectTest = this.pitchProjectTest.bind(this);
    // this.fetchTest = this.fetchTest.bind(this);
    // this.updateBalance = this.updateBalance.bind(this);
  }

  componentDidMount () {

    // console.log(this.props)
    if (this.props.web3) {
      this.watchTransfer();
    }
  }

  // componentWillMount() {
  //
  //   // get web3 interface;
  //   // this is either injected by a browser (like mist or metamask),
  //   // or provided by a locally running ethereum node
  //   getWeb3.then(results => {
  //
  //     // get the current web3 account;
  //     // there is currently no way to keep this up-to-date
  //     // without polling, so the user has to refresh
  //     // the page after changing their account in, e.g. in metamask
  //     results.web3.eth.getAccounts().then(accounts => {
  //       //console.log(accounts);
  //       this.setState({account: accounts[0]});
  //
  //       // instantiate an interface to the GenieToken contract
  //       var contract = TruffleContract(GenieToken);
  //       contract.setProvider(results.web3.currentProvider);
  //       contract.deployed().then(instance => {
  //         this.setState({contract: instance}, () => {
  //
  //           // we now have everything we need to fetch
  //           // the user's balance
  //           this.updateBalance();
  //         });
  //       });
  //     });
  //   });
  // }

  // updateBalance() {
  //   this.state.contract.balanceOf(this.state.account).then(balance => {
  //     this.setState({
  //       balance: balance.toNumber()
  //     });
  //   });
  // }


  // watchMint () {
  //   this.props.tokenInstance.Mint().watch((error, event) => {
  //     console.log(event);
  //     // this.setState({ balance: this.state.balance + event.amount});
  //   });
  // }

  // fetchTest () {
  //   this.props.fetchChainProjects(this.props.crowdsaleInstance, this.props.projectContract);
  // }

  test () {
    this.props.crowdsaleInstance.buyTokens({from: this.props.account, value: 1000000});
  }

  pitchProjectTest(){
    this.props.crowdsaleInstance.pitchProject('project1', 5000000, 10000000, '300', '300', {from: this.props.account});
  }

  watchTransfer () {
    this.props.tokenInstance.Transfer().watch((error, event) => {
      if (event.args.to === this.props.account) {
        this.setState({ balance: this.state.balance + event.amount});
      }
    });
  }

  render() {
    return (
      <nav className="series navbar-container">
        <div onClick={this.test}>TEST</div>
        <div onClick={this.pitchProjectTest}>PITCHTEST</div>
        <div className= "navbar-left">
          <img className="gen-logo" src="https://s3.amazonaws.com/genie-portal-dev/static/logo.png"/>
          <div className="genus-dev-dash">
            <div className="gen-dev">GENUS DEVELOPMENT</div>
            <div className="gen-dash">GENIE DASHBOARD</div>
          </div>
        </div>
        <div className="navbar-right">
          <div className="user-container">
          </div>
          <UserDropdownContainer />
          <TransferModal />
          <ProjectFormModal />
        </div>
      </nav>
    );
  }
}

// <div onClick={this.fetchTest}>FETCHTEST</div>
const mapStateToProps = state => {
  return {
    web3: state.network.web3,
    crowdsaleInstance: state.network.crowdsaleInstance,
    projectContract: state.network.project,
    tokenInstance: state.network.tokenInstance,
    account: state.network.account
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchChainProjects: (crowdsale, projectContract) => dispatch(fetchChainProjects(crowdsale, projectContract))
//   };
// };

export default connect(mapStateToProps)(TokenInterface);
