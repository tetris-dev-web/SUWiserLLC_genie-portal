import TruffleContract from 'truffle-contract';
import Project from '../../truffle/build/contracts/Project.json';

const ProjectContract = TruffleContract(Project);

export const integrateProjectsData = async (crowdsale, projects) => {
  const projectAddrs = [];
  const projectsData = Object.keys(projects).map(async (projectId) => {
    const project = projectsData[projectId];
    const instance = ProjectContract.at(project.address);
    projectAddrs.push(instance.address);

    return formatProjectData(crowdsale, instance, project);
  });

  const resolvedProjectsData = await Promise.all(projectsData);
  return {
    projectAddrs,
    resolvedProjectsData
  };
};

export const formatProjectData = async (crowdsale, instance, project) => {
  project.active = await instance.active();
  if (project.active) {
    return project;//for now
  } else {
    const totalVotes = await crowdsale.totalVotesCast();
    const projectVotes = await instance.totalVotes_();

    project.voteShare = projectVotes / totalVotes;
  }

  project.instance = instance;

  return project;
};

export const pitchProject = async (crowdsale, projectData, account) => {
  let { title, capitalRequired, valuation, latitude, longitude } = projectData;
  const address = await crowdsale.pitchProject(title, capitalRequired, valuation, latitude, longitude, {from: account});
  projectData.address = address;
  return projectData;
};
