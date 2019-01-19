import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import merge from 'lodash/merge';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import GNITokenCrowdsale from '../truffle/build/contracts/GNITokenCrowdsale.json';
import Token from '../truffle/build/contracts/Token.json';
import Project from '../truffle/build/contracts/Project.json';
import Voting from '../truffle/build/contracts/Voting.json';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  let web3Provider;
  let provider;
  let preloadedState = {};

  if (window.currentUser) {
    preloadedState = { session: { currentUser: window.currentUser }};
    delete window.currentUser;
  }

  if (typeof web3 != 'undefined') {
    web3Provider = web3.currentProvider;

    provider = new Web3(web3Provider);

    const token = TruffleContract(Token);
    token.setProvider(web3Provider);

    const crowdsale = TruffleContract(GNITokenCrowdsale);
    crowdsale.setProvider(web3Provider);

    const voting = TruffleContract(Voting);
    voting.setProvider(web3Provider);

    const projectContract = TruffleContract(Project);
    projectContract.setProvider(web3Provider);

    let account;
    let tokenInstance;
    let crowdsaleInstance;
    let votingInstance;
    provider.eth.getCoinbase((err, _account) => {
      account = _account;
      console.log("tokenInst: ", token)
      token.deployed().then((_tokenInstance) => {
        console.log("tokenInst: ", _tokenInstance)
        tokenInstance = _tokenInstance;
      })
      .then(() => {
        return voting.deployed().then((_votingInstance) => {
          votingInstance = _votingInstance;
        })
      })
      .then(() => {
        crowdsale.deployed().then((_crowdsaleInstance) => {
          crowdsaleInstance = _crowdsaleInstance;
          preloadedState = merge({}, preloadedState, { network: {account, tokenInstance, votingInstance, crowdsaleInstance, projectContract, web3 } });
          store = configureStore(preloadedState);
          window.getState = store.getState; //just for development purposes - remove later - use logger
          const root = document.getElementById('root');
          ReactDOM.render(<Root store={store} />, root);
        });
      });
    });
  } else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    store = configureStore(preloadedState);
    window.getState = store.getState;
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
  }
});
