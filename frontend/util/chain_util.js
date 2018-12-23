import TruffleContract from 'truffle-contract';
import Project from '../../truffle/build/contracts/Project.json';

const ProjectContract = TruffleContract(Project);

export const integrateProjectsData = async (crowdsale, initialProjectsData) => {
  const projectInstances = await getProjectInstances(crowdsale);
  return await getProjectsData(crowdsale, projectInstances, initialProjectsData);
  // const projectTitles = Object.keys(initialProjectsData);
  //
  // return {
  //   projectsData,
  //   projectTitles
  // };
  // const projectsData = Object.keys(projects).map(async (projectId) => {
  //   const project = projects[projectId];
  //
  //   if (project.address) {
  //     const address = JSON.parse(project.address);
  //     const instance = ProjectContract.at(address);
  //     projectAddrs.push(instance.address);
  //
  //     return formatProjectData(totalVotesCast, instance, project);
  //   }
  //
  //   return project;
  // });
  //
  // const resolvedProjectsData = await Promise.all(projectsData);
  //
  // return {
  //   projectAddrs,
  //   resolvedProjectsData
  // };
};

const getProjectsData = async (crowdsale, projectInstances, initialProjectsData) => {
  const totalVotesCast = await crowdsale.totalVotesCast();

  const projectsData = projectInstances.map(instance => {
    return formatProjectData(totalVotesCast, instance, initialProjectsData);
  });

  return await Promise.all(projectsData);
};

const getProjectInstances = async crowdsale => {
  const projectAddresses = await getProjectAddresses(crowdsale);

  const projectInstances = projectAddresses.map(address => {
    return ProjectContract.at(address);
  });

  return await Promise.all(projectInstances);
};

const getProjectAddresses = async crowdsale => {
  const totalProjectCount = await crowdsale.totalProjectCount();
  const projectAddresses = [];

  for (let i = 1; i <= totalProjectCount; i++) {
    let projectAddress = crowdsale.projectById(i);
    projectAddresses.push(projectAddress);
  }

  return await Promise.all(projectAddresses);
};

export const formatProjectData = async (totalVotesCast, instance, initialProjectsData) => {
  const title = await instance.name_();
  const project = initialProjectsData[title];

  project.instance = instance;
  project.active = await instance.active_();

  if (project.active) {
    return project;//for now
  } else {
    const projectVotes = await instance.totalVotes_();

    project.voteShare = projectVotes / totalVotesCast;
  }

  return project;
};

export const pitchProject = async (crowdsale, data, account) => {
  // let title = data.get("project[title]");
  // let capital_required = data.get("project[capital_required]");
  // let valuation = data.get("project[valuation]");
  // let latitude = data.get("project[latitude]");
  // let longitude = data.get("project[longitude]");
  let { title, capital_required, valuation, latitude, longitude } = data;
  return await crowdsale.pitchProject(title, capital_required, valuation, latitude, longitude, {from: account});
  // console.log('stringify:', JSON.stringify(address));
  // console.log(address);
  // data.address = JSON.stringify(address);
  // // data.append("project[address]", address.tx);
  //
  // // data.address = address.tx;
  // return data;
};
