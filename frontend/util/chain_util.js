import sigUtil from "eth-sig-util"
// import abi from "ethereumjs-abi"

export const getProjectData = async (projectFactoryInstance, projectContract, id, address = null) => {
  if (!address) {
    address = await projectFactoryInstance.projectById(id);
  }

  const projectInstance = projectContract.at(address);
  const activationTimeBN = await projectInstance.activationTime();
  const activationTime = activationTimeBN.toNumber();
  const closingTimeBN = await projectInstance.closingTime();
  const openingTimeBN = await projectInstance.openingTime();
  const closingTime = Number(closingTimeBN);
  const votesBN = await projectInstance.totalVotes();
  const votes = await votesBN.toNumber();
  const projectData = await projectInstance.getData();
  const active = await projectInstance.active();

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
    closingTime,
    votes,
    active,
    capitalRequired: projectData[2].toNumber(),
    valuation: projectData[3].toNumber(),
    cashFlow: JSON.parse(projectData[4])
  };
};

export const integrateProjectsData = async (projectFactoryInstance, projectContract) => {
  console.log('about to get data', projectFactoryInstance)
  console.log(projectContract)
  const totalProjectCount = await projectFactoryInstance.totalProjectCount();
  console.log('p count', Number(totalProjectCount))
  const projectsData = [];

  for (let i = 1; i <= totalProjectCount.toNumber(); i++) {
    let projectData = getProjectData(projectFactoryInstance, projectContract, i);
    projectsData.push(projectData);
  }

  return Promise.all(projectsData).then(resolvedProjectsData => {
    console.log('got the data', resolvedProjectsData)
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
       // console.log("p",purchase)
      const time = purchase.blockNumber;
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

export const voteAndUpdateProjects = async (
  account,
  votes,
  type,
  votingInstance,
  projectAddress,
  projects,
  projectLeaderTracker,
  activation,
  web3
) => {
  // const block = web3.eth.getBlock("latest");
  const batch = web3.createBatch();
  // console.log("block", block)

  if (type === 'removeVotes') {
    batch.add(votingInstance.voteAgainstProject.request(projectAddress, votes, {from: account}));
  } else {
    batch.add(votingInstance.voteForProject.request(projectAddress, votes, {from: account}));
  }

  Object.keys(projects).forEach(project => {
    if (project.activationTime === 0 && project.title) {
      // !== 'Matt\'s Mansion'
      batch.add(projectLeaderTracker.trackProject.request(project.id, {from: account}))
    }
  })

  console.log("batch", batch)
  // batch.add(activation.tryActivateProject.request({from: account}));
  return await batch.execute();
}

export const fetchAllTokenTransferLogs = async (inactiveToken, activeToken, receiveAllTokenTransfers, dispatch) => {
  const inactiveTransferEvents = await fetchTokenTransferEvents(inactiveToken);
  const activeTransferEvents = await fetchTokenTransferEvents(activeToken);
  console.log("events", inactiveTransferEvents, activeTransferEvents)
  const inactiveTransferData = await getLogs(inactiveTransferEvents);
  const activeTransferData = await getLogs(activeTransferEvents);

  dispatch(receiveAllTokenTransfers({inactiveTransferData, activeTransferData}));
}

export const fetchReceiveDividendsLogs = async (dividends, receiveReceiveDividendsLogs, dispatch) => {
  const events = await dividends.ReceiveDividends(
    {},
    {
      fromBlock: 0,
      toBlock: 'latest'
    }
  );

  const logs = await getLogs(events);
  return dispatch(receiveReceiveDividendsLogs(logs));
}

export const fetchProjecteCashflow = async (projectContract, projectAddress, cashFlowLen, receiveProject, dispatch) => {
  const project = await projectContract.at(projectAddress);
  const events = await project.ReceiveCashFlow(
    {},
    {
      fromBlock: 0,
      toBlock: 'latest'
    }
  );

  const logs = await getLogs(events);
  let len;
  const cashFlow = logs.reduce((cashFlow, log) => {
    len = len ? len + 1 : cashFlowLen + 1;
    cashFlow[len] = {
      cashFlow: Number(log.args.weiAmount),
      isActuals: true
    }

    return cashFlow;
  }, {})

  return dispatch(receiveProject({
    id: logs[0].args.projectId,
    cashFlow
  }));
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

export const pitchProject = async (projectFactoryInstance, data, account) => {
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
    lat: latitude,
    lng: longitude
  });

  return await projectFactoryInstance.createProject(
    projectInfo,
    Math.round(valuation),
    Math.round(capital_required),
    cashflow,
    {from: account}
  );
};

export const fetchTokenBalances = async (inactiveToken, activeToken, account) => {
  const accountInactive = await inactiveToken.balanceOf(account);
  const accountActive = await activeToken.balanceOf(account);
  const totalInactive = await inactiveToken.totalSupply();
  const totalActive = await activeToken.totalSupply();

  return {
    accountInactive,
    accountActive,
    totalInactive,
    totalActive
  }
}

export const fetchWeiRaised = async (crowdsaleInstance) => {
  console.log("fetch weiRaised function", crowdsaleInstance)
  const weiRaisedBN = await crowdsaleInstance.weiRaised_();
  console.log("weiRaisedBN", weiRaisedBN)
  return weiRaisedBN.toNumber();
}

export const buyTokens = async (crowdsale, account, weiAmount) => {
  await crowdsale.buyTokens({from: account, value: weiAmount});
};
