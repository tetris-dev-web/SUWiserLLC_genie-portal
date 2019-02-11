const sigUtil = require("eth-sig-util")

const seed = async (_crowdsale, _projectFactory, _token, _voting, _developer, _account1, _account2) => {

  const crowdsale = _crowdsale;
  const projectFactory = _projectFactory;
  const token = _token;
  const voting = _voting;
  const developer = _developer;
  const account1 = _account1; //add ether to these to differentiate
  const account2 = _account2;

  console.log(_account1)
  console.log(_account2)


  let projAddr1;
  let projAddr2;
  let projAddr3;
  let projAddr4;
  let projAddr5;
  let projAddr6;

  const createProjects = async () => {
    const createProject = async (
          title,
          capitalRequired,
          valuation,
          lat,
          lng,
          id
      ) => {
      const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
      const busLink = 'awsomeBusinessPlanLinkYOOOOOOOOOOO.com/imAReallyAwesomeBusinessPlanYo';
      const projectInfo = JSON.stringify({
        title,
        description,
        busLink,
        lat,
        lng
      })
      const cashflow = JSON.stringify(sampleCashflow);
      // const voteForHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote for ${title}`}])
      // const voteAgainstHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote against ${title}`}])
      // const data = crowdsale.seedProject.getData(
      //   projectInfo,
      //   description,
      //   capitalRequired,
      //   valuation,
      //   cashflow,
      //   voteForHash,
      //   voteAgainstHash
      // );
      // const gas = web3.eth.estimateGas({
      //   to: crowdsale.address,
      //   data
      // });
      await crowdsale.seedProject(
        projectInfo,
        capitalRequired,
        valuation,
        cashflow,
        {
          from: developer
        }
      );
      console.log("project created")
      return await projectFactory.projectById.call(id);
    }

    console.log("about to create projects")
    projAddr1 = await createProject(
      'HamInn',
      0,
      900,
      '40.7128',
      '74.0060',
      1
     );
    console.log("p1", projAddr1)
    let inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    // console.log(Project.at(projAddr1))
    projAddr2 = await createProject(
      'Matt\'s Mansion',
      200,
      800,
      '40.7128',
      '74.0060',
      2
    );
    console.log("p2", projAddr2)
    inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    projAddr3 = await createProject(
      'Steven\'s Skyscraper',
      400,
      1000,
      '41.9028',
      '12.4964',
      3
    );
    console.log("p3", projAddr3)
    inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    projAddr4 = await createProject(
      'Liam\'s Lounge',
      600,
      800,
      '31.2304',
      '121.4737',
      4
    );
    console.log("p4", projAddr4)
    inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    projAddr5 = await createProject(
      'Ryan\'s Rooftop',
      500,
      700,
      '5.6037',
      '0.1870',
      5
    );
    console.log("p5", projAddr5)
    inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    projAddr6 = await createProject(
      'Kyle\'s Kale Farm',
      300,
      700,
      '40.7128',
      '74.0060',
      6
    );
    console.log("p6", projAddr6)
    inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
  }

  const createTokenPurchases = async () => {
    const createTokenPurchase = async (address, weiAmount) => {
      console.log("inner purchase")
      console.log("address", address)
      console.log("weiAmount", weiAmount)
      await crowdsale.buyTokens({from: address, value: weiAmount});
    }

    console.log("outer purchase")

    let totalInactiveSupply = await token.totalInactiveSupply.call();
    console.log("totalInactiveSupply", totalInactiveSupply.toNumber());
    let inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    let pendingActivations = await token.pendingActivations.call(developer);
    console.log("pendingActivations", pendingActivations.toNumber());
    await createTokenPurchase(developer, 100);
    totalInactiveSupply = await token.totalInactiveSupply.call();
    console.log("totalInactiveSupply", totalInactiveSupply.toNumber());
    inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    pendingActivations = await token.pendingActivations.call(developer);
    console.log("pendingActivations", pendingActivations.toNumber());
    await createTokenPurchase(developer, 200);
    await createTokenPurchase(developer, 100);
    await createTokenPurchase(developer, 100);
    await createTokenPurchase(developer, 100);
    // await createTokenPurchase(developer, 300);
    // await createTokenPurchase(developer, 150);
    // await createTokenPurchase(developer, 100);
    // await createTokenPurchase(developer, 120);
  }

  const createVotes = async () => {
    const castVote = async (projectAddress, voteAmount) => {
      console.log("inner vote")
      console.log("projectAddress: ", projectAddress)
      console.log("voterAddress: ", voterAddress)
      console.log("voteAmount: ", voteAmount)
      await voting.voteForProject(projectAddress, voteAmount, {from: developer});
    }

    console.log("outer vote")
    // await castVote(projAddr1, developer, 30);//4

    await castVote(projAddr2, 50);//2
    await castVote(projAddr3, 70);//1
    await castVote(projAddr5, 50);//2
    await castVote(projAddr6, 60);//2
    await castVote(projAddr4, 40);//1
  }


  await createProjects();
  console.log("PITCHES COMPLETE")
  await createTokenPurchases();
  console.log("BUYS COMPLETE")
  await createVotes();
  console.log("VOTES COMPLETE")
  // await crowdsale.activateProject();

}

const sampleCashflow = {
  "1": {
    "cashFlow": -50000,
    "isActuals": true
  },
  "2": {
    "cashFlow": -40018,
    "isActuals": true
  },
  "3": {
    "cashFlow": -16857,
    "isActuals": true
  },
  "4": {
    "cashFlow": -2915,
    "isActuals": true
  },
  "5": {
    "cashFlow": -20325,
    "isActuals": true
  },
  "6": {
    "cashFlow": 7864,
    "isActuals": true
  },
  "7": {
    "cashFlow": 25360,
    "isActuals": true
  },
  "8": {
    "cashFlow": 28107,
    "isActuals": true
  },
  "9": {
    "cashFlow": 28942,
    "isActuals": false
  },
  "10": {
    "cashFlow": 28696,
    "isActuals": false
  },
  "11": {
    "cashFlow": 29356,
    "isActuals": false
  },
  "12": {
    "cashFlow": 28854,
    "isActuals": false
  },
  "13": {
    "cashFlow": 28588,
    "isActuals": false
  },
  "14": {
    "cashFlow": 30781,
    "isActuals": false
  },
  "15": {
    "cashFlow": 29081,
    "isActuals": false
  },
  "16": {
    "cashFlow": 31887,
    "isActuals": false
  },
  "17": {
    "cashFlow": 51887,
    "isActuals": false
  },
  "18": {
    "cashFlow": 71887,
    "isActuals": false
  },
  "19": {
    "cashFlow": 30339,
    "isActuals": false
  },
  "20": {
    "cashFlow": 30718,
    "isActuals": false
  },
  "21": {
    "cashFlow": 31102,
    "isActuals": false
  },
  "22": {
    "cashFlow": 31491,
    "isActuals": false
  },
  "23": {
    "cashFlow": 31885,
    "isActuals": false
  },
  "24": {
    "cashFlow": 32283,
    "isActuals": false
  },
  "25": {
    "cashFlow": 32687,
    "isActuals": false
  },
  "26": {
    "cashFlow": 33096,
    "isActuals": false
  },
  "27": {
    "cashFlow": 33509,
    "isActuals": false
  },
  "28": {
    "cashFlow": 33928,
    "isActuals": false
  }
}

module.exports = {
  seed
}
