import React from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import  { withRouter } from 'react-router';
import TransactionModal from './entities/transaction_modal/transaction_modal'

import Navbar from './entities/navbar/navbar_container';
import Dashboard from './entities/dashboard/dashboard';
import ProjectModalStructure from './entities/dashboard/project_dashboard/project_modals/project_modal_structure';
import FourOhFourPage from './404_page/404_page';


import { notifyTransactionCompletion } from '../actions/ui_actions';
// import DeveloperInfo from './entities/developerInfo/developerInfo';
// import Footer from './entities/footer/footer';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import { connect } from 'react-redux';
import { updateNetwork } from '../actions/chain_actions/network_actions'
import './app.scss';
import './landing/landing.scss';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.watchAccountChange = this.watchAccountChange.bind(this);
    this.watchProjectPitch = this.watchProjectPitch.bind(this);
    this.watchTokenPurchase = this.watchTokenPurchase.bind(this);
    this.watchVoteChange = this.watchVoteChange.bind(this);
    this.setAccount = this.setAccount.bind(this);
  }

  componentDidMount() {
    this.setAccount();
    this.watchAccountChange();
    this.watchProjectPitch();
    this.watchTokenPurchase();
    this.watchVoteChange();
    this.watchReceiveDividends();
  }

  setAccount () {
    this.props.provider.eth.getCoinbase((err, _account) => {
      const account = _account ? _account : false;
      if (account) {
        return this.props.provider.eth.getBalance(account).then(balance => {
          this.props.updateNetwork({ account, balance })
        })
      }
    })
  }

  watchAccountChange () {
    this.props.web3.currentProvider.publicConfigStore.on('update', network => {
      this.setAccount();
    });
  }

  async watchProjectPitch () { //event listener for pitched projects // get project from database and integrate into store
    const { projectFactoryInstance } = this.props;
    projectFactoryInstance.ProjectPitch().watch((error, event) => {
      this.props.notifyTransactionCompletion("Your project pitch transaction has been mined to the blockchain.");
    });
  }

  watchTokenPurchase () {
    this.props.crowdsaleInstance.TokenPurchase().watch((error, event) => {
      this.props.notifyTransactionCompletion("Your token purchase transaction has been mined to the blockchain.");
    })
  }

  watchVoteChange () {
    this.props.votingInstance.VoteChange().watch((error, event) => {
      this.props.notifyTransactionCompletion("Your votes have been mined to the blockchain");
    })
  }

  watchReceiveDividends () {
    this.props.dividendsInstance.ReceiveDividends().watch((error, event) => {
      this.props.notifyTransactionCompletion("Your cashflows have been mined to the blockchain");
    })
  }

  render() {
    const { history, account } = this.props;
    if (
      history.location.pathname === '/dashboard/demo' &&
      (!account || account === '0xEF898fd948F50D5010d3Ec20233faE23D89a1a51')
    ) {
      return (
        <FourOhFourPage
          title={"Account 404"}
          description={"Please log in to your ethereum account on metamask or use one of our demo accounts."}
          />
      )
    }
    return (
      <div className="rootDiv">
        <TransactionModal />
        <Dashboard />
        <ProjectModalStructure />
        <Navbar />
      </div>
    );
  }
}


// CONTAINER

const mapStateToProps  = state => {
  return {
    eventSubscription: state.network.eventSubscription,
    web3: state.network.web3,
    account: state.network.account,
    web3Provider: state.network.web3Provider,
    projectFactoryInstance: state.network.projectFactoryInstance,
    crowdsaleInstance: state.network.crowdsaleInstance,
    votingInstance: state.network.votingInstance,
    dividendsInstance: state.network.dividendsInstance,
    provider: state.network.provider
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNetwork: network => dispatch(updateNetwork(network)),
    notifyTransactionCompletion: notification => dispatch(notifyTransactionCompletion(notification))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
