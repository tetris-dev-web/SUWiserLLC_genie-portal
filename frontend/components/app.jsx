import React from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import TransactionModal from './entities/transaction_modal/transaction_modal'
import {
  AuthRoute,
  ProtectedRoute,
  RedirectedRoute
} from '../util/route_util';
import Navbar from './entities/navbar/navbar_container';
import Landing from './entities/landing/landing';
import Dashboard from './entities/dashboard/dashboard';
import { notifyTransactionCompletion } from '../actions/ui_actions';
// import DeveloperInfo from './entities/developerInfo/developerInfo';
// import Footer from './entities/footer/footer';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import { connect } from 'react-redux';
import { updateNetwork } from '../actions/chain_actions/network_actions'
import './app.scss';

import Modal from '../components/entities/modal/modal';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.watchAccountChange = this.watchAccountChange.bind(this);
    this.watchProjectPitch = this.watchProjectPitch.bind(this);
    this.watchTokenPurchase = this.watchTokenPurchase.bind(this);
    this.watchVoteChange = this.watchVoteChange.bind(this);
  }

  componentDidMount() {
    this.watchAccountChange();
    this.watchProjectPitch();
    this.watchTokenPurchase();
    this.watchVoteChange();
  }

  watchAccountChange () {
    this.props.web3.currentProvider.publicConfigStore.on('update', network => {
      this.props.provider.eth.getCoinbase((err, _account) => {
        const account = _account ? account : false;

        if (account) {
          return this.props.provider.eth.getBalance(account).then(balance => {
            this.props.updateNetwork({ account, balance })
          })
        }

      })
    });
  }

  watchProjectPitch () { //event listener for pitched projects // get project from database and integrate into store
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
      console.log('hello')
      this.props.notifyTransactionCompletion("Your votes have been mined to the blockchain");
    })
  }

  render() {
    return (
      <div>
        <TransactionModal />
        <Dashboard />
      </div>
    );
  }
}
// <DeveloperInfo />
// <div style={{height: "100%"}}>
//   <Modal />
//   <Navbar />
//   <Dashboard/>
// </div>

const mapStateToProps  = state => {
  return {
    account: state.network.account,
    web3: state.network.web3,
    projectFactoryInstance: state.network.projectFactoryInstance,
    crowdsaleInstance: state.network.crowdsaleInstance,
    votingInstance: state.network.votingInstance,
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
// <div path="/dashboard" component={Dashboard} />


// <RedirectedRoute />
// <Switch>
//   <AuthRoute path="/login" component={Landing} />
//   <ProtectedRoute path="/dashboard" component={Dashboard} />
// </Switch>


// <div className="none">THIS SHOULD BE RED</div>



// <RedirectedRoute />
// <Switch>
//   <AuthRoute path="/login" component={Landing} />
//   <ProtectedRoute path="/dashboard" component={Dashboard} />
// </Switch>
