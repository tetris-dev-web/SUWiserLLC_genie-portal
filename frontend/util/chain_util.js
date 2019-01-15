export const integrateProjectsData = async (crowdsale, projectContract, initialProjectsData) => {
  const projectAddresses = await getProjectAddresses(crowdsale);

  const projectsData = projectAddresses.map(address => {
    const instance = projectContract.at(address);
    return formatProjectData(instance, address, initialProjectsData);
  });

  return Promise.all(projectsData).then(resolvedProjectsData => {
    return resolvedProjectsData.reduce((projects, project) => {
      projects[project.title] = project;
      return projects;
    }, {});
  });
};

const getProjectAddresses = async crowdsale => {
  const totalProjectCount = await crowdsale.totalProjectCount_();
  const projectAddresses = [];

  for (let i = 1; i <= totalProjectCount; i++) {
    let projectAddress = crowdsale.projectById(i);
    projectAddresses.push(projectAddress);
  }
  return await Promise.all(projectAddresses);
};

export const formatProjectData = async (instance, address, initialProjectsData) => {
  //combine functions into one on the blockchain
  const title = await instance.name_();
  const project = initialProjectsData[title];

  project.instance = instance;
  project.active = await instance.active_();

  if (project.active) {
    project.votes = 0;
    project.activationTime = await instance.activationTime_();
  } else {
    project.votes = await instance.totalVotes_();
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
