import sigUtil from "eth-sig-util"
// import abi from "ethereumjs-abi"

export const getProjectData = async (projectFactoryInstance, projectContract, id, address = null) => {
  if (!address) {
    address = await projectFactoryInstance.projectById(id);
  }

  const projectInstance = projectContract.at(address);
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
     const capitalHistory = purchases.reduce((capitalHistory, purchase) => {
      const time = purchase.args.time.toNumber();
      const value = purchase.args.value.toNumber();

      if (capitalHistory[time]) {
        capitalHistory[time] += value;
      } else {
        capitalHistory[time] = value;
      }

      return capitalHistory;
    }, {});

    dispatch(receiveTokenPurchases(capitalHistory));
  });
};

export const fetchProjectVotes = async (account, projectContract, projectAddress) => {
  console.log(projectAddress)
  const project = await projectContract.at(projectAddress);
  return await project.votesOf.call(account);
}

export const fetchFreeVotes = async (account, votingToken) => {
  return await votingToken.freedUpBalanceOf(account);
}

export const voteForProject = async (account, votes, votingInstance, projectAddress) => {
  console.log("account", account)
  console.log("votes", votes)
  console.log("projectAddress", projectAddress)
  return await votingInstance.voteForProject(projectAddress, votes, {from: account});
}

export const voteAgainstProject = async (account, votes, votingInstance, projectAddress) => {
  return await votingInstance.voteAgainstProject(projectAddress, votes, {from: account});
}

export const fetchAllTokenTransferLogs = async (inactiveToken, activeToken, receiveAllTokenTransfers, dispatch) => {
  const inactiveTransferEvents = await fetchTokenTransferEvents(inactiveToken);
  const activeTransferEvents = await fetchTokenTransferEvents(activeToken);
  console.log("events", inactiveTransferEvents, activeTransferEvents)
  const inactiveTransferLogs = await getLogs(inactiveTransferEvents);
  const activeTransferLogs = await getLogs(activeTransferEvents);

  console.log("transfers", inactiveTransferLogs, activeTransferLogs)
  dispatch(receiveAllTokenTransfers({inactiveTransferLogs, activeTransferLogs}));
}

const getLogs = async (events) => {
  return new Promise((resolve, reject) => {
    events.get((err, logs) => {
      resolve(logs);
    });
  });
}

const fetchTokenTransferEvents= async (token) => {
  return await token.Transfer(
    {},
    {
      fromBlock: 0,
      toBlock: 'latest'
    }
  );
}

export const pitchProject = async (crowdsale, data, account) => {
  let {
      title,
      description,
      capital_required,
      valuation,
      latitude,
      longitude,
      cashflow,
      busLink
    } = data;

  const projectInfo = JSON.stringify({
    title,
    description,
    busLink,
    model_id,
    lat: latitude,
    lng: longitude
  });

  return await crowdsale.pitchProject(
    projectInfo,
    capital_required,
    valuation,
    cashflow,
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
  await crowdsale.buyTokens({from: account, value: weiAmount});
};
