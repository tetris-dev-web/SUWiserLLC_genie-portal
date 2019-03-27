import React from 'react';
import { Provider } from 'react-redux';
import {
  AuthRoute,
  ProtectedRoute,
  RedirectedRoute
} from '../util/route_util';
import Navbar from './entities/navbar/navbar_container';
import Landing from './entities/landing/landing';
import Dashboard from './entities/dashboard/dashboard_container';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import { connect } from 'react-redux';
import { updateNetwork } from '../actions/chain_actions/network_actions'
import './app.scss';


class App extends React.Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);

  }

=======
>>>>>>> fa0d9365ea38bcabc667b57750e9a1b5e4b18d50
  componentDidMount() {
    this.props.web3.currentProvider.publicConfigStore.on('update', network => {
      this.props.provider.eth.getCoinbase((err, account) => {
        this.props.updateNetwork({ account: account ? account : false })
      })
    });
  }

  render() {
    return (
      <div className="rootDiv">
        <Navbar />
        <Dashboard />
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
