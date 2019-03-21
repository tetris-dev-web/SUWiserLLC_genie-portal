const { web3Instance, truffleContract, web3InstanceByTruffleContract } = require('../chain_connection/contracts');
const { fetchEvents } = require('../chain_connection/events');
const { numberParser } = require('../util/number_util');
const Project = require('../../truffle/build/contracts/Project.json');
const ProjectFactory = require('../../truffle/build/contracts/ProjectFactory.json');
//we should refactor this and make class based controllers


const fetchProjects = async () => {
const { projectFactoryInstance, projectContract } = connectWeb3();
  const totalProjectCount = await projectFactoryInstance.methods.totalProjectCount().call();
  const projectsData = [];

  for (let i = 1; i <= totalProjectCount; i++) {
    let projectData = _fetchProjectGraphData(projectFactoryInstance, projectContract, i);
    projectsData.push(projectData);
  }

  return Promise.all(projectsData).then(resolvedProjectsData => {
    return resolvedProjectsData.reduce((projects, project) => {
      projects[project.id] = project;
      return projects;
    }, {});
  });
};

const _fetchProjectGraphData = async (projectFactoryInstance, projectContract, id, address = null) => {
  if (!address) {
    address = await projectFactoryInstance.methods.projectById(id).call();
  }

  const projectInstance = web3InstanceByTruffleContract(projectContract, address);
  const projectMethods = projectInstance.methods

  const activationTime = await numberParser(projectMethods.activationTime());
  const votes = await numberParser(projectMethods.totalVotes());
  const projectData = await projectMethods.getData().call();
  const { title, lat, lng } = JSON.parse(projectData[1]); //this should be changed on the blockchain end.

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
  };
};

const fetchProjectGraphData = async (address) => {
  const { projectFactoryInstance, projectContract } = connectWeb3();
  const projectInstance = web3InstanceByTruffleContract(projectContract, address)
  const id =  await numberParser(projectInstance.methods.id());//we need to make project keys the address on the frontend so we dont need to do this

  return await _fetchProjectGraphData(projectFactoryInstance, projectContract, id, address);
}

const fetchProjectModuleData = async (projectAddress) => {
  const projectInstance = web3Instance(Project, projectAddress);
  const projectMethods = projectInstance.methods;

  const id = await numberParser(projectMethods.id());//we need to change the frontend project keys to address so we dont need to do this

  const closingTime = await numberParser(projectMethods.closingTime());
  const openingTime = await numberParser(projectMethods.openingTime());

  const projectData = await projectMethods.getData().call();
  const { busLink, description } = JSON.parse(projectData[1]);

  const prePortalCashflow = JSON.parse(projectData[4])
  const cashflow = await fetchEvents(projectInstance, 'ReceiveCashFlow');

  return {
    id,
    prePortalCashflow,
    cashflow,
    busLink,
    description,
    closingTime,
    openingTime
  }
}

const demoInvestorProjectVotes = async projectAddress => {
  const projectInstance = web3Instance(Project, projectAddress);
  return await projectInstance.methods.votesOf("0xef898fd948f50d5010d3ec20233fae23d89a1a51").call();
}

const connectWeb3 = () => {
  return {
    projectFactoryInstance: web3Instance(ProjectFactory, "0xb58937b6e5c79cb5254d60316a2b3580b8b58d9d"),
    projectContract: truffleContract(Project)
  }
}

module.exports = {
  fetchProjects,
  fetchProjectGraphData,
  fetchProjectModuleData,
  demoInvestorProjectVotes
};
