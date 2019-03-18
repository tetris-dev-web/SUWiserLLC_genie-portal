const { web3Instance, truffleContract, web3InstanceByTruffleContract } = require('../chain_connection/contracts');
const { numberParser } = require('../util/number_util');
const Project = require('../../truffle/build/contracts/Project.json');
const ProjectFactory = require('../../truffle/build/contracts/ProjectFactory.json');

const fetchProjectsData = async () => {
  const projectFactoryInstance = web3Instance(ProjectFactory, "0xb58937b6e5c79cb5254d60316a2b3580b8b58d9d");
  const projectContract = truffleContract(Project);
  const totalProjectCount = await projectFactoryInstance.methods.totalProjectCount().call();
  const projectsData = [];

  for (let i = 1; i <= totalProjectCount; i++) {
    let projectData = dataByProject(projectFactoryInstance, projectContract, i);
    projectsData.push(projectData);
  }

  return Promise.all(projectsData).then(resolvedProjectsData => {
    return resolvedProjectsData.reduce((projects, project) => {
      projects[project.id] = project;
      return projects;
    }, {});
  });
};

const dataByProject = async (projectFactoryInstance, projectContract, id, address = null) => {
  if (!address) {
    address = await projectFactoryInstance.methods.projectById(id).call();
  }

  const projectInstance = web3InstanceByTruffleContract(projectContract, address);
  const projectMethods = projectInstance.methods

  const activationTime = await numberParser(projectMethods.activationTime());
  const closingTime = await numberParser(projectMethods.closingTime());
  const openingTime = await numberParser(projectMethods.openingTime());
  const votes = await numberParser(projectMethods.totalVotes());
  const projectData = await projectMethods.getData().call();
  const active = await projectMethods.active().call();
  const { title, lat, lng, busLink, description } = JSON.parse(projectData[1]);
  return {
    id,
    address,
    instance: projectInstance,
    title,
    lat,
    lng,
    description,
    busLink,
    activationTime,
    openingTime,
    closingTime,
    votes,
    active,
    capitalRequired: Number(projectData[2]),
    valuation: Number(projectData[3]),
    cashFlow: JSON.parse(projectData[4])
  };
};

module.exports = {
  fetchProjectsData,
  dataByProject
};
