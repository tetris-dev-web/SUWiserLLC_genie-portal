const sigUtil = require("eth-sig-util")

const seed = async (_crowdsale, _token, _voting, _developer, _account1, _account2) => {

  const crowdsale = _crowdsale;
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
    const createProject = async (title, capitalRequired, valuation, lat, lng, id) => {
      const voteForHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote for ${title}`}])
      const voteAgainstHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote against ${title}`}])
      await crowdsale.seedProject(title, capitalRequired, valuation, lat, lng, voteForHash, voteAgainstHash, {from: developer});
      console.log("project created")
      return await crowdsale.projectById.call(id);
    }

    console.log("about to create projects")
    projAddr1 = await createProject('HamInn', 0, 900, '70', '130', 1);
    console.log("p1", projAddr1)
    let inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    // console.log(Project.at(projAddr1))
    projAddr2 = await createProject('Matt\'s Mansion', 200, 800, '70', '130', 2);
    console.log("p2", projAddr2)
    inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    projAddr3 = await createProject('Steven\'s Skyscraper', 400, 1000, '70', '130', 3);
    console.log("p3", projAddr3)
    inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    projAddr4 = await createProject('Liam\'s Lounge', 600, 800, '70', '130', 4);
    console.log("p4", projAddr4)
    inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    projAddr5 = await createProject('Ryan\'s Rooftop', 500, 700, '70', '130', 5);
    console.log("p5", projAddr5)
    inactiveBalance = await token.inactiveBalanceOf.call(developer);
    console.log("inactiveBalance", inactiveBalance.toNumber());
    projAddr6 = await createProject('Kyle\'s Kale Farm', 300, 700, '70', '130', 6);
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
    const castVote = async (projectAddress, voterAddress, voteAmount) => {
      console.log("inner vote")
      console.log("projectAddress: ", projectAddress)
      console.log("voterAddress: ", voterAddress)
      console.log("voteAmount: ", voteAmount)
      await voting.seed(projectAddress, voterAddress, voteAmount);
    }

    console.log("outer vote")
    // await castVote(projAddr1, developer, 30);//4

    await castVote(projAddr2, developer, 50);//2
    await castVote(projAddr3, developer, 70);//1
    await castVote(projAddr5, developer, 50);//2
    await castVote(projAddr6, developer, 60);//2
    await castVote(projAddr4, developer, 40);//1
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
