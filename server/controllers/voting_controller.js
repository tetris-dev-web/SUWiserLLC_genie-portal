const {
  votingInstance,
  projectLeaderTrackerInstance,
  projectFactoryInstance,
  _projectInstance,
  activationInstance,
} = require('../chain_models/models');
const { web3 } = require('../chain_connection/web3_configuration');
const {
  votingAddress,
  projectLeaderTrackerAddress,
} = require('../chain_models/contract_addresses');
const { dotenv } = require('../chain_connection/web3_configuration');
const { attemptProjectActivation } = require('./activation_controller');
const { sendTransaction } = require('../chain_util/chain_util');

const voteAndUpdateProjects = async (votes, type, projectAddress) => {
  //using a demo account for now
  const address = '0xef898fd948f50d5010d3ec20233fae23d89a1a51';
  const privateKey = process.env.PRIVATE_KEY;

  await recordVotes(projectAddress, votes, type, address, privateKey);

  await recalculateLeader(address, privateKey);

  await attemptProjectActivation();

  return null;
};

const recordVotes = async (projectAddress, votes, type, address, privateKey) => {
  let method;

  if (type === 'removeVotes') {
    method = votingInstance.methods.voteAgainstProject(projectAddress, votes);
  } else {
    method = votingInstance.methods.voteForProject(projectAddress, votes);
  }

  const nonce = await web3.eth.getTransactionCount(address);

  console.log('REALLY WANT TO VOTE HERE');
  return await sendTransaction(
    {
      nonce,
      to: votingAddress,
      value: 0,
      data: method.encodeABI(),
    },
    address,
    privateKey,
  );
};

const recalculateLeader = async (address, privateKey) => {
  const projectsWithActiveStatuses = async () => {
    const projectWithActiveStatus = async (projectId) => {
      const address = await projectFactoryInstance.methods.projectById(projectId).call();
      const instance = _projectInstance(address);
      const isActive = await instance.methods.active().call();

      return {
        isActive,
        address,
      };
    };

    const totalProjectCount = await projectFactoryInstance.methods.totalProjectCount().call();
    const result = [];

    for (let projectId = 1; projectId <= totalProjectCount; projectId++) {
      const project = projectWithActiveStatus(projectId);
      result.push(project);
    }

    return Promise.all(result);
  };

  const trackProject = async (projectAddress, nonce) => {
    return await sendTransaction(
      {
        nonce,
        to: projectLeaderTrackerAddress,
        value: 0,
        data: projectLeaderTrackerInstance.methods.trackProject(projectAddress).encodeABI(),
      },
      projectAddress,
      privateKey,
    );
  };

  let currentNonce = await web3.eth.getTransactionCount(address);
  const projects = await projectsWithActiveStatuses();
  const trackProjectTransactions = [];

  projects.forEach((project) => {
    if (!project.isActive) {
      const trackProjectTransaction = trackProject(project.address, currentNonce);
      trackProjectTransactions.push(trackProjectTransaction);
      currentNonce++;
    }
  });

  return Promise.all(trackProjectTransactions);
};

module.exports = {
  voteAndUpdateProjects,
};
