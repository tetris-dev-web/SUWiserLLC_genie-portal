import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import merge from 'lodash/merge';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import GNITokenCrowdsale from '../truffle/build/contracts/GNITokenCrowdsale.json';
import SeedableCrowdsale from '../truffle/build/contracts/SeedableCrowdsale.json';
import InactiveToken from '../truffle/build/contracts/InactiveToken.json';
import ActiveToken from '../truffle/build/contracts/ActiveToken.json';
import VotingToken from '../truffle/build/contracts/VotingToken.json';
import Project from '../truffle/build/contracts/Project.json';
import ProjectFactory from '../truffle/build/contracts/ProjectFactory.json'
import Voting from '../truffle/build/contracts/Voting.json';
import SeedableVoting from '../truffle/build/contracts/SeedableVoting.json';
import Activation from '../truffle/build/contracts/Activation.json';
import ProjectLeaderTracker from '../truffle/build/contracts/ProjectLeaderTracker.json';
import Dividends from '../truffle/build/contracts/Dividends.json';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  let web3Provider;
  let provider;
  let preloadedState = {};

  if (web3) {
    web3Provider = web3.currentProvider;
    // web3Provider.enable();
    provider = new Web3(web3Provider);

    const inactiveToken = TruffleContract(InactiveToken);
    inactiveToken.setProvider(web3Provider);

    const activeToken = TruffleContract(ActiveToken);
    activeToken.setProvider(web3Provider);

    const votingToken = TruffleContract(VotingToken);
    votingToken.setProvider(web3Provider);
    // console.log("version", web3Provider.networkVersion)
    // console.log(provider._proivder.networkVersion)
    const crowdsale = TruffleContract(SeedableCrowdsale);
    crowdsale.setProvider(web3Provider);

    const voting = TruffleContract(Voting);
    voting.setProvider(web3Provider);

    const projectFactory = TruffleContract(ProjectFactory);
    projectFactory.setProvider(web3Provider);

    const projectContract = TruffleContract(Project);
    projectContract.setProvider(web3Provider);

    const activation = TruffleContract(Activation);
    activation.setProvider(web3Provider);

    const projectLeaderTracker = TruffleContract(ProjectLeaderTracker);
    projectLeaderTracker.setProvider(web3Provider);

    const dividends = TruffleContract(Dividends);
    dividends.setProvider(web3Provider);

    let account;
    let balance;
    let inactiveTokenInstance;
    let activeTokenInstance;
    let votingTokenInstance;
    let crowdsaleInstance;
    let votingInstance;
    let projectFactoryInstance;
    let activationInstance;
    let projectLeaderTrackerInstance;
    let dividendsInstance;
    provider.eth.getCoinbase((err, _account) => {
      account = _account;
      // console.log("tokenInst: ", token)
      inactiveToken.deployed().then((_inactiveTokenInstance) => {
        // console.log("tokenInst: ", _tokenInstance)
        inactiveTokenInstance = _inactiveTokenInstance;
      })
      .then(() => {
        return provider.eth.getBalance(account).then(_balance => {
          balance = _balance
        })
      })
      .then(() => {
        return activeToken.deployed().then((_activeTokenInstance) => {
          activeTokenInstance = _activeTokenInstance;
        })
      })
      .then(() => {
        return votingToken.deployed().then((_votingTokenInstance) => {
          votingTokenInstance = _votingTokenInstance;
        })
      })
      .then(() => {
        return voting.deployed().then((_votingInstance) => {
          votingInstance = _votingInstance;
        });
      })
      .then(() => {
        return projectFactory.deployed().then((_projectFactoryInstance)=> {
          projectFactoryInstance = _projectFactoryInstance;
        });
      })
      .then(() => {
        return projectLeaderTracker.deployed().then((_projectLeaderTrackerInstance)=> {
          projectLeaderTrackerInstance = _projectLeaderTrackerInstance;
        });
      })
      .then(() => {
        return activation.deployed().then((_activationInstance)=> {
          activationInstance = _activationInstance;
        });
      })
      .then(() => {
        return dividends.deployed().then((_dividendsInstance)=> {
          dividendsInstance = _dividendsInstance;
        });
      })
      .then(() => {
        crowdsale.deployed().then((_crowdsaleInstance) => {
          crowdsaleInstance = _crowdsaleInstance;

          preloadedState = merge(
            {},
            preloadedState,
            {
              network:
              {
                account,
                balance,
                inactiveTokenInstance,
                activeTokenInstance,
                votingTokenInstance,
                votingInstance,
                crowdsaleInstance,
                projectFactoryInstance,
                projectContract,
                projectLeaderTrackerInstance,
                activationInstance,
                dividendsInstance,
                web3,
                provider
              }
            }
          );
          console.log({
            activationAddress: activationInstance.address,
            activeTokenAddress: activeTokenInstance.address,
            crowdsaleAddress: crowdsaleInstance.address,
            dividendsAddress: dividendsInstance.address,
            inactiveTokenAddress: inactiveTokenInstance.address,
            projectFactoryAddress: projectFactoryInstance.address,
            projectLeaderTrackerAddress: projectLeaderTrackerInstance.address,
            votingAddress: votingInstance.address,
            votingTokenAddress: votingTokenInstance.address
          })
          store = configureStore(preloadedState);
          window.getState = store.getState; //just for development purposes - remove later - use logger
          const root = document.getElementById('root');
          ReactDOM.render(<Root store={store} window={window}/>, root);
        });
      });
    });
  } else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    store = configureStore(preloadedState);
    // window.getState = store.getState; //just for development purposes - remove later - use logger
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} window={window}/>, root);
  }
});
