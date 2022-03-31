const { web3 } = require("../chain_connection/web3_configuration");
const { fetchEvents } = require("../chain_util/chain_util");
const { numberParser } = require("../util/number_util");
const { formatProject } = require("../formatters/project_modal");
const { sendTransaction } = require("../chain_util/chain_util");
const { projectFactoryInstance, _projectInstance } = require("../chain_models/models");

const demoDepositCashflow = async (wei, projectAddress) => {
  const address = process.env.DEV_ACCOUNT;
  const privateKey = process.env.PRIVATE_KEY;
  const nonce = await web3.eth.getTransactionCount(address);
  const projectInstance = _projectInstance(projectAddress);

  await sendTransaction(
    {
      nonce,
      to: projectAddress,
      value: web3.utils.toHex(wei),
      data: projectInstance.methods.deposit().encodeABI(),
    },
    address,
    privateKey,
  );
};

const fetchProjects = async () => {
  const totalProjectCount = await projectFactoryInstance.methods.totalProjectCount().call();
  const projectsData = [];

  for (let projectId = 1; projectId <= totalProjectCount; projectId++) {
    let projectData = _fetchProjectGraphData({ id: projectId });
    projectsData.push(projectData);
  }

  return Promise.all(projectsData).then((resolvedProjectsData) => {
    return resolvedProjectsData.reduce((projects, project) => {
      projects[project.id] = project;
      return projects;
    }, {});
  });
};

const _fetchProjectGraphData = async (options) => {
  if (!options.address) {
    options.address = await projectFactoryInstance.methods.projectById(options.id).call();
  }

  const projectInstance = _projectInstance(options.address);

  if (!options.id) {
    options.id = await numberParser(projectInstance.methods.id());
  }

  const { address, id } = options;
  const projectMethods = projectInstance.methods;

  const activationTime = await numberParser(projectMethods.activationTime());
  const votes = await numberParser(projectMethods.totalVotes());
  const projectData = await projectMethods.getData().call();
  const { title, lat, lng } = JSON.parse(projectData[1]); //this should be changed on the blockchain end.

  //modal data
  const closingTime = await numberParser(projectMethods.closingTime());
  const openingTime = await numberParser(projectMethods.openingTime());
  const { busLink, description } = JSON.parse(projectData[1]);
  const prePortalCashflow = JSON.parse(projectData[4]);
  const cashflow = await fetchEvents(projectInstance, "ReceiveCashFlow");

  return {
    id,
    lat,
    lng,
    address,
    title,
    activationTime,
    votes,
    capitalRequired: Number(projectData[2]),
    valuation: Number(projectData[3]),
    //modal info
    prePortalCashflow,
    cashflow,
    busLink,
    description,
    closingTime,
    openingTime,
  };
};

const fetchProjectGraphData = async (address) => {
  return await _fetchProjectGraphData({ address });
};

const fetchProjectCashFlow = async (address) => {
  const projectInstance = _projectInstance(address);

  const cashFlow = await fetchEvents(projectInstance, "ReceiveCashFlow");

  return cashFlow
    .filter((event) => Number(event.returnValues.weiAmount) > 0)
    .map((event) => {
      return {
        amount : Number(event.returnValues.weiAmount),
        time : Number(event.returnValues.time),
        project_id : event.returnValues.projectId
      }
    });
}

// const  fetchProjectPerformanceData  = async (projectAddress) => {
//   const projectInstance = _projectInstance(projectAddress);
//   const projectMethods = projectInstance.methods;
//
//   const id = await numberParser(projectMethods.id());  // TODO we need to change the frontend project keys to address so we dont need to do this
//
//   const closingTime = await numberParser(projectMethods.closingTime());
//   const openingTime = await numberParser(projectMethods.openingTime());
//
//   const projectData = await projectMethods.getData().call();
//   const { busLink, description } = JSON.parse(projectData[1]);
//
//   const prePortalCashflow = JSON.parse(projectData[4])
//   const cashflow = await fetchEvents(projectInstance, 'ReceiveCashFlow');
//
//   return formatProject({
//     id,
//     prePortalCashflow,
//     cashflow,
//     busLink,
//     description,
//     closingTime,
//     openingTime
//   });
// }

const demoInvestorVotesByProject = async (projectAddress) => {
  const projectInstance = _projectInstance(projectAddress);
  return await projectInstance.methods.votesOf(process.env.DEV_ACCOUNT).call();
};

module.exports = {
  fetchProjects,
  fetchProjectGraphData,
  // fetchProjectModalData,
  demoInvestorVotesByProject,
  demoDepositCashflow,
  fetchProjectCashFlow
};
