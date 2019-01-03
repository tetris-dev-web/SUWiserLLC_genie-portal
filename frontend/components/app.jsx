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
import { connect } from 'react-redux';
import {processVotes} from '../actions/chain_actions/vote_actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.voteTest = this.voteTest.bind(this);
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

  componentDidMount () {
    this.props.crowdsaleInstance.VoteAddition().watch((error, event) => {
        console.log(event);
    });

    this.props.crowdsaleInstance.VoteRemoval().watch((error, event) => {
      console.log(event)
    });
  }

  voteTest () {
    this.props.processVotes({
      vote_additions: [
        {project_address: this.props.account, voter_address: this.props.account, votes: 1, type: 'addition', signed_message: 'defkweofmk'},
        {project_address: this.props.account, voter_address: this.props.account, votes: 2, type: 'addition', signed_message: 'defkweofmk'}
      ],
      vote_removals: [
        {project_address: this.props.account, voter_address: this.props.account, votes: 3, type: 'removal', signed_message: 'defkweofmk'},
        {project_address: this.props.account, voter_address: this.props.account, votes: 4, type: 'removal', signed_message: 'defkweofmk'}
      ]
    });
  }


  render() {
    return (
      <div className="">
        <div onClick={this.voteTest}>VoteTest</div>
        <Navbar />
        <RedirectedRoute />
        <Switch>
          <AuthRoute path="/login" component={Landing} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps  = state => {
  return {
    account: state.network.account,
    crowdsaleInstance: state.network.crowdsaleInstance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processVotes: vote_data => dispatch(processVotes(vote_data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
