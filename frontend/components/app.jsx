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
import Footer from './entities/footer/footer';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import GNITokenCrowdsale from '../../truffle/build/contracts/GNITokenCrowdsale.json';
import Token from '../../truffle/build/contracts/Token.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    // if (typeof web3 != 'undefined') {
    //   this.web3Provider = web3.currentProvider;
    // } else {
    //   this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    // }
    //
    // this.web3 = new Web3(this.web3Provider);
    //
    // this.token = TruffleContract(Token);
    // this.token.setProvider(this.web3Provider);
    //
    // this.crowdsale = TruffleContract(GNITokenCrowdsale);
    // this.crowdsale.setProvider(this.web3Provider);
  }

  // componentDidMount() {
  //   let account;
  //   let tokenInstance;
  //   let crowdsaleInstance;
  //   this.web3.eth.getCoinbase((err, _account) => {
  //     account = _account;
  //     this.token.deployed().then((_tokenInstance) => {
  //       tokenInstance = _tokenInstance;
  //     })
  //     .then(() => {
  //       this.crowdsale.deployed().then((_crowdsaleInstance) => {
  //         crowdsaleInstance = _crowdsaleInstance;
  //         this.props.initializeNetwork({web3: this.web3, account, tokenInstance, crowdsaleInstance});
  //       });
  //     });
  //   });
  // }

  render() {
    return (
      <div className="">
        <Navbar />
        <RedirectedRoute />
        <Switch>
          <AuthRoute path="/login" component={Landing} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}


export default App;
