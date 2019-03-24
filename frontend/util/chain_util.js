import sigUtil from "eth-sig-util"
// import abi from "ethereumjs-abi"

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
  // const batch = web3.createBatch();
  // console.log("block", block)

  // if (type === 'removeVotes') {
  //   batch.add(votingInstance.voteAgainstProject.request(projectAddress, votes, {from: account}));
  // } else {
  //   batch.add(votingInstance.voteForProject.request(projectAddress, votes, {from: account}));
  // }
  //
  // Object.keys(projects).forEach(project => {
  //   if (project.activationTime === 0 && project.title) {
  //     // !== 'Matt\'s Mansion'
  //     batch.add(projectLeaderTracker.trackProject.request(project.id, {from: account}))
  //   }
  // })
  //
  const leader = await projectLeaderTracker.tentativeLeader();
  console.log('leader', leader)
  // batch.add(activation.tryActivateProject.request({from: account}));
  // return await batch.execute();
  // await activation.tryActivateProject({from: account});
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

export const buyTokens = async (crowdsale, account, weiAmount) => {
  await crowdsale.buyTokens({from: account, value: weiAmount});
};
