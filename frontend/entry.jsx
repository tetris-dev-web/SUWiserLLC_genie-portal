import * as ExpressAPI from "./util/fetch_util/express_api_util";
import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";
import merge from "lodash/merge";
import Web3 from "web3";
import TruffleContract from "truffle-contract";
import GNITokenCrowdsale from "../truffle/build/contracts/GNITokenCrowdsale.json";
import SeedableCrowdsale from "../truffle/build/contracts/SeedableCrowdsale.json";
import InactiveToken from "../truffle/build/contracts/InactiveToken.json";
import ActiveToken from "../truffle/build/contracts/ActiveToken.json";
import VotingToken from "../truffle/build/contracts/VotingToken.json";
import Project from "../truffle/build/contracts/Project.json";
import ProjectFactory from "../truffle/build/contracts/ProjectFactory.json";
import Voting from "../truffle/build/contracts/Voting.json";
import SeedableVoting from "../truffle/build/contracts/SeedableVoting.json";
import Activation from "../truffle/build/contracts/Activation.json";
import ProjectLeaderTracker from "../truffle/build/contracts/ProjectLeaderTracker.json";
import Dividends from "../truffle/build/contracts/Dividends.json";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  let web3Provider;
  let provider;
  let preloadedState = {};
  if (typeof window.ethereum !== "undefined") {
    web3Provider = window.ethereum;

    provider = new Web3(web3Provider);
    console.log(window.ethereum)

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

    account = process.env.DEV_ACCOUNT;
    // provider.eth.getCoinbase((err, _account) => {
    // account = _account;
    // console.log("tokenInst: ", token)
    // inactiveToken.deployed().then((_inactiveTokenInstance) => {
    // console.log("tokenInst: ", _tokenInstance)
    inactiveTokenInstance = inactiveToken.at("0x0481b7da3c03c0fefd2d4605409464462086917e");
    // })
    // .then(() => {
    //   if (account) {
    //     return provider.eth.getBalance(account).then(_balance => {
    //       balance = _balance
    //     })
    //   }
    //   return;
    // })
    // .then(() => {
    // return activeToken.deployed().then((_activeTokenInstance) => {
    //   activeTokenInstance = _activeTokenInstance;
    // })
    activeTokenInstance = activeToken.at("0xaa82a247b0d0b7407b60753870fc4b2f31d900d6");
    // })
    // .then(() => {
    // return votingToken.deployed().then((_votingTokenInstance) => {
    //   votingTokenInstance = _votingTokenInstance;
    // })
    votingTokenInstance = votingToken.at("0x7d3f22de0b6f9c0ad3922b0d39425a350c421467");
    // })
    // .then(() => {
    // return voting.deployed().then((_votingInstance) => {
    //   votingInstance = _votingInstance;
    // });
    votingInstance = voting.at("0x5f69e60ca7a927f87b1ed3f80c6c4b2f3b599aec");
    // })
    // .then(() => {
    // return projectFactory.deployed().then((_projectFactoryInstance)=> {
    //   projectFactoryInstance = _projectFactoryInstance;
    // });
    projectFactoryInstance = projectFactory.at("0x5a366ca75a3b3169099de63cefc1fd7e5a9ea059");
    // })
    // .then(() => {
    // return projectLeaderTracker.deployed().then((_projectLeaderTrackerInstance)=> {
    //   projectLeaderTrackerInstance = _projectLeaderTrackerInstance;
    // });
    projectLeaderTrackerInstance = projectLeaderTracker.at(
      "0x8b616ded81a8c8d9e30875cf77c24261ed7723f6",
    );
    // })
    // .then(() => {
    // return activation.deployed().then((_activationInstance)=> {
    //   activationInstance = _activationInstance;
    // });
    activationInstance = activation.at("0xb85006d9095b233c9c7eb2f16af23c21f9da34fd");
    // })
    // .then(() => {
    // return dividends.deployed().then((_dividendsInstance)=> {
    //   dividendsInstance = _dividendsInstance;
    // });
    dividendsInstance = dividends.at("0x8c8b54c2f7c11ba51352dc218891a3cc3245f0dc");
    // })
    // .then(() => {
    // crowdsale.deployed().then((_crowdsaleInstance) => {
    //   crowdsaleInstance = _crowdsaleInstance;
    crowdsaleInstance = crowdsale.at("0xc2773530c0ec596e50e0456191fa7c692529d4c2");

    preloadedState = merge({}, preloadedState, {
      network: {
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
        provider,
        web3Provider,
      },
    });
    // console.log({
    //   activationAddress: activationInstance.address,
    //   activeTokenAddress: activeTokenInstance.address,
    //   crowdsaleAddress: crowdsaleInstance.address,
    //   dividendsAddress: dividendsInstance.address,
    //   inactiveTokenAddress: inactiveTokenInstance.address,
    //   projectFactoryAddress: projectFactoryInstance.address,
    //   projectLeaderTrackerAddress: projectLeaderTrackerInstance.address,
    //   votingAddress: votingInstance.address,
    //   votingTokenAddress: votingTokenInstance.address
    // })

    store = configureStore(preloadedState);
    window.getState = store.getState; //just for development purposes - remove later - use logger
    const root = document.getElementById("root");
    ReactDOM.render(
      <Root store={store} window={window} networkVersion={web3Provider.networkVersion} />,
      root,
    );
    // });
    // });
    // });
  } else {
    // web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    // proivder = new Web3(web3Provider);
    //
    //   preloadedState = merge(
    //     {},
    //     preloadedState,
    //     {
    //       network:
    //       {
    //         provider,
    //         web3Provider
    //       }
    //     }
    //   );
    //
    store = configureStore(preloadedState);
    window.getState = store.getState; //just for development purposes - remove later - use logger

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} window={window} networkVersion={3} />, root);
    // })
  }
});
