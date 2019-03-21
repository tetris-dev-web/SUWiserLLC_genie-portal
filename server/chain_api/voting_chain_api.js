const { web3Instance } = require('../chain_connection/contracts');
const { web3 } = require('../chain_connection/contracts');
const { numberParser } = require('../util/number_util');
const { dotenv } = require('../chain_connection/web3_configuration');
const Voting = require('../../truffle/build/contracts/Voting.json');
const ProjectLeaderTracker = require('../../truffle/build/contracts/ProjectLeaderTracker.json')
const Activation = require('../../truffle/build/contracts/Activation.json');


const demoInvestorVoteAndUpdate = async (
  votes,
  type,
  projectAddress,
  projects
) => {
  // const block = web3.eth.getBlock("latest");
  const { votingInstance, projectLeaderTrackerInstance, activationInstance } = await web3Instances();
  // const batch = web3.createBatch();
  // console.log("block", block)

  // if (type === 'removeVotes') {
  //   batch.add(votingInstance.voteAgainstProject.request(projectAddress, votes, {from: account}));
  // } else {
  //   batch.add(votingInstance.voteForProject.request(projectAddress, votes, {from: account}));
  // }

  const trackProjectTransactions = [];

  Object.keys(projects).forEach(project => {
    if (project.activationTime === 0 && project.title) {
      // !== 'Matt\'s Mansion'
      // batch.add(projectLeaderTrackerInstance.trackProject.request(project.id, {from: account}))
      const trackProjectTransaction = trackProject(projectLeaderTracker, project.address);
      trackProjectTransactions.push(trackProjectTransaction);
    }
  })



  console.log("batch", batch)
  batch.add(activationInstance.tryActivateProject.request({from: account}));
  // return await batch.execute();
}

const trackProject = (contract, projectAddress) => {
  const account = "0xef898fd948f50d5010d3ec20233fae23d89a1a51";
  const privateKey = process.env.PRIVATE_KEY;

  web3.eth.getTransactionCount(account, (err, nonce) => {
    const data = contract.methods.trackProject(projectAddress).getData();

    const tx = new Tx({
      nonce: nonce,
      gasPrice: web3.toHex(web3.toWei('20', 'gwei')),
      gasLimit: 100000,
      to: address,
      value: 0,
      data: data,
    });

    tx.sign(privateKey);
    const serializedTx = tx.serialize();

    const raw = '0x' + serializedTx.toString('hex');

    return await web3.eth.sendSignedTransaction(raw);
}

const web3Instances = async = () => {
  const activationInstance = web3Instance(Activation, "0x9caf86a1997958aad6b424f8848e6495743e6b5a");
  const projectLeaderTrackerInstance = web3Instance(ProjectLeaderTracker, "0x4682f35dd40a6b4d312b8df60aae12be2c82046e");
  const votingnInstance = web3Instance(Voting, "0x67debb21b0b036a2491df65fc577acc4a7b4b223");

  return {
    activationInstance,
    projectLeaderTrackerInstance,
    votingInstance
  }
}
