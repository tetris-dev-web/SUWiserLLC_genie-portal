const sigUtil = require("eth-sig-util")
// const { parseMethod } = require('./test/parseUtil');
// const SeedableCrowdsale = artifacts.require("SeedableCrowdsale")
// const SeedableVoting = artifacts.require("SeedableVoting");
// const Token = artifacts.require("Token");
// const Project = artifacts.require("Project");

// _crowdsale, _token, _voting, _developer, _account1, _account2
const seed = async (_crowdsale, _token, _voting, _developer, _account1, _account2) => {
// module.exports = async (callback) => {
  // console.log("helloooo")
  // console.log("_DEVELOPER",_developer)
  const crowdsale = _crowdsale;
  const token = _token;
  const voting = _voting;
  const developer = _developer;
  const account1 = _account1;
  const account2 = _account2;

  // const crowdsale = await SeedableCrowdsale.deployed();
  // const token = await Token.deployed();
  // const voting = await SeedableVoting.deployed();
  // // const account = web3.currentProvider.addresses[0];
  // const address = web3.currentProvider.addresses[0];
  // console.log("address", address)
  // const account = web3.eth.accounts.privateKeyToAccount();
  // const crowdsaleABI =
  // const developer = _dev;
  // const account1 =
  // const account2 = _account2;
  // console.log("crowdsale", crowdsale.address)
  // console.log("token", token.address)
  // console.log("voting", voting.address)
  // console.log("CROWDSALE", crowdsale.abi.at(crowdsale.address))
  // console.log("crowdsale", crowdsale)
  // console.log("account", account)
  // console.log("web3Provider", web3.currentProvider)
  // console.log("web3.eth", web3.eth)
  // console.log("crowdsale", crowdsale)
  // console.log("account", account)
  // console.log("web3.eth.accounts", web3.eth.accounts)
  //
  // const transact = async (data, to) => {
  //   console.log("about to transact")
  //   // console.log("account", account)
  //   // console.log("to", to)
  //   // console.log("data", data)
  //   console.log("function", web3.eth.signTransaction)
  //   const signedTx = await web3.eth.signTransaction({
  //     from: account,
  //     to: to,
  //     data: data,
  //     gas: 400000
  //   }, )
  //   console.log("signed")
  //   console.log("signedTx", signedTx)
  //   console.log("transaction signed")
  //   return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  // }

  let projAddr1;
  let projAddr2;
  let projAddr3;
  let projAddr4;
  let projAddr5;

  const createProjects = async () => {
    const createProject = async (title, capitalRequired, valuation, lat, lng, id) => {
      const voteForHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote for ${title}`}])
      const voteAgainstHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote against ${title}`}])
      console.log("about to pitch a project")
      await crowdsale.seedProject(title, capitalRequired, valuation, lat, lng, voteForHash, voteAgainstHash, {from: developer});
      // const contract = new web3.eth.contract(crowdsale.abi);
      // console.log(".......sup")
      // // console.log("contract", contract)
      // const inst = contract.at(crowdsale.address)
      // console.log("inst", inst)
      // const data = inst.seedProject.getData(title, capitalRequired, valuation, lat, lng, voteForHash, voteAgainstHash);
      // console.log("clueless")
      // console.log("data", data)
      // const t = await transact(data, crowdsale.address);
      // console.log("t", t)
      return await crowdsale.projectById.call(id);
    }
    console.log("about to create projects")
    projAddr1 = await createProject('HamInn', 400, 900, '70', '130', 1);
    console.log("p1", projAddr1)
    // console.log(Project.at(projAddr1))
    projAddr2 = await createProject('Matt\'s Mansion', 200, 800, '70', '130', 2);
    console.log("p2", projAddr2)
    projAddr3 = await createProject('Steven\'s Skyscraper', 300, 1000, '70', '130', 3);
    console.log("p3", projAddr3)

    projAddr4 = await createProject('Liam\'s Lounge', 100, 500, '70', '130', 4);
    console.log("p4", projAddr4)

    projAddr5 = await createProject('Ryan\'s Rooftop', 500, 700, '70', '130', 5);
    console.log("p5", projAddr5)
    // projAddr1 = await createProject('The', 400, 900, '70', '130', 1);
    // console.log("p1", projAddr1)
    // console.log(Project.at(projAddr1))
    // projAddr2 = await createProject('that', 200, 800, '70', '130', 2);
    // console.log("p2", projAddr2)
    // projAddr3 = await createProject('this', 300, 1000, '70', '130', 3);
    // console.log("p3", projAddr3)
    //
    // projAddr4 = await createProject('those', 100, 500, '70', '130', 4);
    // console.log("p4", projAddr4)
    //
    // projAddr5 = await createProject('these', 500, 700, '70', '130', 5);
    // console.log("p5", projAddr5)
  }

  const createTokenPurchases = async () => {
    const createTokenPurchase = async (address, weiAmount) => {
      console.log("inner purchase")
      console.log("address", address)
      console.log("weiAmount", weiAmount)
      await crowdsale.buyTokens({from: address, value: weiAmount});
    }

    console.log("outer purchase")
    await createTokenPurchase(developer, 100);
    await createTokenPurchase(developer, 200);
    await createTokenPurchase(developer, 100);
    await createTokenPurchase(developer, 100);
  }

  const createVotes = async () => {
    const castVote = async (projectAddress, voterAddress, voteAmount) => {
      console.log("inner vote")
      console.log("projectAddress: ", projectAddress)
      console.log("voterAddress: ", voterAddress)
      console.log("voteAmount: ", voteAmount)
      await voting.seed(projectAddress, voterAddress, voteAmount);
    }

    console.log("outer vote")
    await castVote(projAddr1, developer, 3500);//4
    await castVote(projAddr4, developer, 4000);//1
    await castVote(projAddr2, developer, 5000);//2
    await castVote(projAddr5, developer, 5500);//2
    await castVote(projAddr3, developer, 7000);//1
  }


  await createProjects();
  console.log("PITCHES COMPLETE")
  await createTokenPurchases();
  console.log("BUYS COMPLETE")
  await createVotes();
  console.log("VOTES COMPLETE")
  // await crowdsale.activateProject();

}

module.exports = {
  seed
}
