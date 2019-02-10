import sigUtil from "eth-sig-util"
// import abi from "ethereumjs-abi"

export const integrateProjectsData = async (crowdsale, projectContract, initialProjectsData) => {

  const getProjectAddresses = async crowdsale => {
    const totalProjectCount = await crowdsale.totalProjectCount_();
    const projectAddresses = [];

    for (let i = 1; i <= totalProjectCount.toNumber(); i++) {
      let projectAddress = crowdsale.projectById(i);
      projectAddresses.push(projectAddress);
    }
    return await Promise.all(projectAddresses);
  };

  const formatProjectData = async (instance, address, initialProjectsData, id) => {

    //combine functions into one on the blockchain
    const title = await instance.title_();
    const project = initialProjectsData[title];
    const capitalRequired = await instance.capitalRequired_();
    const valuation = await instance.valuation();

    project.capitalRequired = capitalRequired.toNumber();
    project.valuation = valuation.toNumber();
    project.active = await instance.active_();
    project.id = id;
    project.instance = instance;

    if (project.active) {
      project.votes = 0;
      const activationTime = await instance.activationTime_();
      project.activationTime = activationTime.toNumber();
    } else {
      const votes = await instance.totalVotes_();
      project.votes = votes.toNumber();
    }

    return project;
  };

  const projectAddresses = await getProjectAddresses(crowdsale);

  const projectsData = projectAddresses.map((address, i) => {
    const instance = projectContract.at(address);
    return formatProjectData(instance, address, initialProjectsData, i + 1);
  });

  return Promise.all(projectsData).then(resolvedProjectsData => {
    return resolvedProjectsData.reduce((projects, project) => {
      projects[project.title] = project;
      return projects;
    }, {});
  });
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

export const buyTokens = async (crowdsale, account, weiAmount) => {
  await crowdsale.buyTokens({from: account, value: 10})
};
