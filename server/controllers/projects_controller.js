const { fetchEvents } = require('../chain_util/chain_util');
const { numberParser } = require('../util/number_util');
const { formatProject } = require('../formatters/project_module');
const { projectFactoryInstance, _projectInstance } = require('../chain_models/models');

const fetchProjects = async () => {
  const totalProjectCount = await projectFactoryInstance.methods.totalProjectCount().call();
  const projectsData = [];

  for (let projectId = 1; projectId <= totalProjectCount; projectId++) {
    let projectData = _fetchProjectGraphData({id: projectId});
    projectsData.push(projectData);
  }

  return Promise.all(projectsData).then(resolvedProjectsData => {
    return resolvedProjectsData.reduce((projects, project) => {
      projects[project.id] = project;
      return projects;
    }, {});
  });
};

const _fetchProjectGraphData = async options => {
  if (!options.address) {
    options.address = await projectFactoryInstance.methods.projectById(options.id).call();
  }

  const projectInstance = _projectInstance(options.address)

  if (!options.id) {
    options.id =  await numberParser(projectInstance.methods.id());
  }

  const { address, id } = options;
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
  return await _fetchProjectGraphData({address});
}

const fetchProjectModuleData = async (projectAddress) => {
  const projectInstance = _projectInstance(projectAddress);
  const projectMethods = projectInstance.methods;

  const id = await numberParser(projectMethods.id());//we need to change the frontend project keys to address so we dont need to do this

  const closingTime = await numberParser(projectMethods.closingTime());
  const openingTime = await numberParser(projectMethods.openingTime());

  const projectData = await projectMethods.getData().call();
  const { busLink, description } = JSON.parse(projectData[1]);

  const prePortalCashflow = JSON.parse(projectData[4])
  const cashflow = await fetchEvents(projectInstance, 'ReceiveCashFlow');

  return formatProject({
    id,
    prePortalCashflow,
    cashflow,
    busLink,
    description,
    closingTime,
    openingTime
  });
}

const demoInvestorVotesByProject = async projectAddress => {
  const projectInstance = _projectInstance(projectAddress);
  return await projectInstance.methods.votesOf("0xef898fd948f50d5010d3ec20233fae23d89a1a51").call();
}

module.exports = {
  fetchProjects,
  fetchProjectGraphData,
  fetchProjectModuleData,
  demoInvestorVotesByProject
};
