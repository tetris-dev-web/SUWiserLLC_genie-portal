import sigUtil from "eth-sig-util"
// import abi from "ethereumjs-abi"

export const getProjectData = async (projectFactoryInstance, projectContract, id, address = null) => {
  if (!address) {
    address = await projectFactoryInstance.projectById(id);
  }

  const projectInstance = projectContract.at(address);
  // const projectInfo = await projectInstance.projectInfo();
  // const { title, lat, lng, description } = JSON.parse(projectInfo);
  // const capitalRequired = await projectInstance.capitalRequired();
  // const valuation = await projectInstance.valuation();
  // const cashFlowString = await projectInstance.cashFlow();
  // const cashFlow = JSON.parse(cashFlowString);
  const activationTimeBN = await projectInstance.activationTime();
  const activationTime = activationTimeBN.toNumber();
  const votesBN = await projectInstance.totalVotes();
  const votes = await votesBN.toNumber();
  const projectData = await projectInstance.getData();
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
    votes,
    capitalRequired: projectData[2].toNumber(),
    valuation: projectData[3].toNumber(),
    cashFlow: JSON.parse(projectData[4])
  };

  // return {
  //   id,
  //   address,
  //   instance: projectInstance,
  //   title,
  //   lat,
  //   lng,
  //   description,
  //   capitalRequired,
  //   valuation,
  //   cashFlow
  // };
};

export const integrateProjectsData = async (projectFactoryInstance, projectContract) => {

  const totalProjectCount = await projectFactoryInstance.totalProjectCount();
  const projectsData = [];

  for (let i = 1; i <= totalProjectCount.toNumber(); i++) {
    let projectData = getProjectData(projectFactoryInstance, projectContract, i);
    projectsData.push(projectData);
  }

  return Promise.all(projectsData).then(resolvedProjectsData => {
    return resolvedProjectsData.reduce((projects, project) => {
      projects[project.id] = project;
      return projects;
    }, {});
  });
  // const formatProjectData = async (instance, address, initialProjectsData, id) => {
  //
  //   //combine functions into one on the blockchain
  //   const projectInfo = await instance.projectInfo();
  //   const { title, lat, lng, description } = JSON.parse(projectInfo);
  //   const capitalRequired = await instance.capitalRequired();
  //   const valuation = await instance.valuation();
  //
  //   project.tit
  //   project.capitalRequired = capitalRequired.toNumber();
  //   project.valuation = valuation.toNumber();
  //   project.active = await instance.active_();
  //   project.id = id;
  //   project.instance = instance;
  //
  //   if (project.active) {
  //     project.votes = 0;
  //     const activationTime = await instance.activationTime_();
  //     project.activationTime = activationTime.toNumber();
  //   } else {
  //     const votes = await instance.totalVotes_();
  //     project.votes = votes.toNumber();
  //   }
  //
  //   return project;
  // };

  // const projectAddresses = await getProjectAddresses(projectFactoryInstance);
  //
  // const projectsData = projectAddresses.map((address, i) => {
  //   const instance = projectContract.at(address);
  //   return formatProjectData(instance, address, initialProjectsData, i + 1);
  // });
  //
  // return Promise.all(projectsData).then(resolvedProjectsData => {
  //   return resolvedProjectsData.reduce((projects, project) => {
  //     projects[project.title] = project;
  //     return projects;
  //   }, {});
  // });
};

export const fetchTokenPurchaseLogs = async (crowdsale, dispatch, receiveTokenPurchases) => {
  const events = await crowdsale.TokenPurchase(
    {},
    {
      fromBlock: 0,
      toBlock: 'latest'
    }
  );

  events.get((err, purchases) => {
    console.log("PURCHASES", purchases)
     const capitalHistory = purchases.reduce((capitalHistory, purchase) => {
      const time = purchase.args.time.toNumber();
      const value = purchase.args.value.toNumber();

      if (capitalHistory[time]) {
        capitalHistory[time] += value;
      } else {
        capitalHistory[time] = value;
      }

      return capitalHistory;
    }, {})

    dispatch(receiveTokenPurchases(capitalHistory));
  })
}


export const pitchProject = async (crowdsale, data, account) => {
  let {
      title,
      city,
      country,
      continent,
      description,
      capital_required,
      latitude,
      longitude,
      cashflow
    } = data;

  const voteForHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote for ${title}`}])
  const voteAgainstHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote against ${title}`}])
  // console.log("pitching!: ",title,voteAgainstHash,voteForHash)
  // console.log("account", account)
  console.log("crowdsale", crowdsale)
  console.log("crowdsale address", crowdsale.address)
  return await crowdsale.pitchProject(
    title,
    city,
    country,
    continent,
    description,
    capital_required,
    latitude,
    longitude,
    cashflow,
    voteForHash,
    voteAgainstHash,
    {from: account}
  );
};

export const fetchWeiRaised = async (crowdsaleInstance) => {
  console.log("fetch weiRaised function", crowdsaleInstance)
  const weiRaisedBN = await crowdsaleInstance.weiRaised_();
  console.log("weiRaisedBN", weiRaisedBN)
  return weiRaisedBN.toNumber();
}

export const buyTokens = async (crowdsale, account, weiAmount) => {
  await crowdsale.buyTokens({from: account, value: 10})
};
