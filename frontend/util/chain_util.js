import sigUtil from "eth-sig-util"
// import abi from "ethereumjs-abi"
import abiDecoder from 'abi-decoder';
export const integrateProjectsData = async (crowdsale, projectContract, initialProjectsData) => {

  const getProjectAddresses = async crowdsale => {
    const totalProjectCount = await crowdsale.totalProjectCount_();
    console.log("totalProjectCount", totalProjectCount.toNumber())
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
    project.instance = instance;
    project.active = await instance.active_();
    project.valuation = await instance.valuation();
    project.capitalRequired = await instance.capitalRequired_();
    project.id = id;

    if (project.active) {
      project.votes = 0;
      project.activationTime = await instance.activationTime_();
    } else {
      project.votes = await instance.totalVotes_();
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
  console.log('about to fetch token purchases')
  const events = await crowdsale.TokenPurchase(
    {},
    {
      fromBlock: 0,
      toBlock: 'latest'
    }
  );

  events.get((err, purchases) => {
     const capitalHistory = purchases.reduce((capitalHistory, purchase) => {
      const block = purchase.blockNumber;
      const value = purchase.args.value.toNumber();

      if (capitalHistory[block]) {
        capitalHistory[block] += value;
      } else {
        capitalHistory[block] = value;
      }

      return capitalHistory;
    }, {})

    dispatch(receiveTokenPurchases(capitalHistory));
  })
}

// export const fetchProjectActivationLogs = async (crowdsale, web3) => {
//   // console.log('about to fetch token purchases')
//   const filter = await web3.eth.filter({
//     fromBlock:0,
//     toBlock: 'latest',
//     address: crowdsale.address,
//     'topics':[
//         web3.sha3('ProjectActivation(address,uint256,uint256)')
//     ]
//   });
//   console.log('about to filter')
//   return await filter.get((error, logs) => {
//     console.log("done filtering")
//     console.log(logs)
//     return logs;
//   })
// }

export const pitchProject = async (crowdsale, data, account) => {
  let { title, capital_required, valuation, latitude, longitude } = data;

  const voteForHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote for ${title}`}])
  const voteAgainstHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote against ${title}`}])
  // console.log("pitching!: ",title,voteAgainstHash,voteForHash)
  // console.log("account", account)
  console.log("crowdsale", crowdsale)
  console.log("crowdsale address", crowdsale.address)
  return await crowdsale.pitchProject(title, capital_required, valuation, latitude, longitude, voteForHash, voteAgainstHash, {from: account});
};

export const buyTokens = async (crowdsale, account, weiAmount) => {
  await crowdsale.buyTokens({from: account, value: 10})
};
