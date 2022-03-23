const { web3Instance } = require("./web3_instance_connect");

const {
  activationAddress,
  activeTokenAddress,
  crowdsaleAddress,
  dividendsAddress,
  inactiveTokenAddress,
  projectFactoryAddress,
  projectLeaderTrackerAddress,
  votingAddress,
  votingTokenAddress,
} = require("./contract_addresses");

const Activation = require("../../truffle/build/contracts/Activation.json");
const ActiveToken = require("../../truffle/build/contracts/ActiveToken.json");
const GNITokenCrowdsale = require("../../truffle/build/contracts/GNITokenCrowdsale.json");
const Dividends = require("../../truffle/build/contracts/Dividends.json");
const InactiveToken = require("../../truffle/build/contracts/InactiveToken.json");
const Project = require("../../truffle/build/contracts/Project.json");
const ProjectFactory = require("../../truffle/build/contracts/ProjectFactory.json");
const ProjectLeaderTracker = require("../../truffle/build/contracts/ProjectLeaderTracker.json");
const Voting = require("../../truffle/build/contracts/Voting.json");
const VotingToken = require("../../truffle/build/contracts/VotingToken.json");

module.exports = {
  _projectInstance: (projectAddress) => web3Instance(Project, projectAddress),
  activationInstance: web3Instance(Activation, activationAddress),
  activeTokenInstance: web3Instance(ActiveToken, activeTokenAddress),
  crowdsaleInstance: web3Instance(GNITokenCrowdsale, crowdsaleAddress),
  dividendsInstance: web3Instance(Dividends, dividendsAddress),
  inactiveTokenInstance: web3Instance(InactiveToken, inactiveTokenAddress),
  projectFactoryInstance: web3Instance(ProjectFactory, projectFactoryAddress),
  projectLeaderTrackerInstance: web3Instance(ProjectLeaderTracker, projectLeaderTrackerAddress),
  votingInstance: web3Instance(Voting, votingAddress),
  votingTokenInstance: web3Instance(VotingToken, votingTokenAddress),
};
