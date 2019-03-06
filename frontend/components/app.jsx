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
import {processVotes} from '../actions/chain_actions/vote_actions';
import './app.scss';

import Modal from '../components/entities/modal/modal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.voteTest = this.voteTest.bind(this);
  }

  componentDidMount () {
    if(this.props.web3){
      this.props.votingInstance.VoteChange().watch((error, event) => {
        console.log(event); //TODO log to state
      });
    }
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
    console.log("HELLO")

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
    votingInstance: state.network.votingInstance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processVotes: vote_data => dispatch(processVotes(vote_data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// <Switch>]
// </Switch>
// <div path="/dashboard" component={Dashboard} />


// <RedirectedRoute />

// <ProtectedRoute path="/dashboard" component={Dashboard} />
// <AuthRoute path="/login" component={Landing} />


<div className="none">THIS SHOULD BE RED</div>
