import React from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import {
  AuthRoute,
  ProtectedRoute,
  RedirectedRoute
} from '../util/route_util';
import Navbar from './entities/navbar/navbar_container';
import Landing from './entities/landing/landing';
import Dashboard from './entities/dashboard/dashboard';
import DeveloperInfo from './entities/developerInfo/developerInfo';
// import Footer from './entities/footer/footer';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import { connect } from 'react-redux';
import { updateNetwork } from '../actions/chain_actions/network_actions'
import './app.scss';

import Modal from '../components/entities/modal/modal';

class App extends React.Component {
  componentDidMount() {
    this.props.web3.currentProvider.publicConfigStore.on('update', network => {
      this.props.provider.eth.getCoinbase((err, account) => {
        this.props.updateNetwork({ account: account ? account : false })
      })
    });
  }

  render() {
    return (
      <div style={{height: "100%"}}>
        <Modal />
        <Navbar />
        <DeveloperInfo />
        <Dashboard/>
      </div>
    );
  }
}

const mapStateToProps  = state => {
  return {
    account: state.network.account,
    web3: state.network.web3,
    crowdsaleInstance: state.network.crowdsaleInstance,
    votingInstance: state.network.votingInstance,
    provider: state.network.provider
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNetwork: network => dispatch(updateNetwork(network))
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
