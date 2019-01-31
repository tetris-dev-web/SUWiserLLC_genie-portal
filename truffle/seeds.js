const sigUtil = require("eth-sig-util")
// const { parseMethod } = require('./test/parseUtil');
// const GNITokenCrowdsale = artifacts.require("GNITokenCrowdsale");
// const SeedableVoting = artifacts.require("VotingTest");
// const Token = artifacts.require("Token");

// _crowdsale, _token, _voting, _developer, _account1, _account2
const seed = async (_crowdsale, _token, _voting, _developer, _account1, _account2) => {
  console.log("helloooo")
  console.log("_DEVELOPER",_developer)
  const crowdsale = _crowdsale;
  const token = _token;
  const voting = _voting;
  const developer = _developer;
  const account1 = _account1;
  const account2 = _account2;

  // const crowdsale = await GNITokenCrowdsale.deployed();
  // console.log("Crowdsale",crowdsale.address)
  // const token = await Token.deployed();
  // console.log("Token", token.address)
  // const voting = await SeedableVoting.deployed();
  // console.log("Voting", voting.address)
  // const developer = await crowdsale.developer();
  // console.log("developer", developer)

  let projAddr1;
  let projAddr2;
  let projAddr3;
  let projAddr4;
  let projAddr5;

  const createProjects = async () => {
    const createProject = async (title, capitalRequired, valuation, lat, lng) => {
      const voteForHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote for ${title}`}])
      const voteAgainstHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote against ${title}`}])
      console.log("about to pitch a project")
      return await crowdsale.seedProject.call( title, capitalRequired, valuation, lat, lng, voteForHash, voteAgainstHash, {from: developer});
    }
    console.log("about to create projects")
    projAddr1 = await createProject('HamInn', 400, 900, '70', '130');
    console.log("p1", projAddr1)
    projAddr2 = await createProject('Matt\'s Mansion', 200, 800, '70', '130');
    console.log("p2", projAddr2)
    projAddr3 = await createProject('Steven\'s Skyscraper', 300, 1000, '70', '130');
    console.log("p3", projAddr3)

    projAddr4 = await createProject('Liam\'s Lounge', 100, 500, '70', '130');
    console.log("p4", projAddr4)

    projAddr5 = await createProject('Ryan\'s Rooftop', 500, 700, '70', '130');
    console.log("p5", projAddr5)

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
  await crowdsale.activateProject();

}

// module.exports = seed
module.exports = {
  seed
}


// const selectRandomAccount = () => {
//   // const random = Math.floor(Math.random() * 10);
//   //
//   // if (random % 2 === 0) {
//   //   return account1;
//   // }
//   //
//   // return account2;
//   return developer;
// }
// const randomWeiAmount = () => {
//   return 8026133089338886 * Math.floor(Math.random());
// }
//
// const totalSupply = await parseMethod(token.totalSupply);
// let tokensPurchased = 0;
// const tokenPurchases = [];
// let i = 0;
// // while (i < 5) {
//   while(tokensPurchased < totalSupply / 5) { //we know that at least one project can be activated...
//     const purchaser = selectRandomAccount();
//     const weiAmount = randomWeiAmount();
//     console.log("ABOUT TO BUY")
//     await crowdsale.buyTokens({from: purchaser, value: weiAmount});
//     // tokenPurchases.push(tokenPurchase);
//     tokensPurchased += weiAmount * 50;
//     i++;
//     // }


// }

// return await Promise.all(tokenPurchases);

// const randomValuation = () => {
//   return 8026133089338886 * (Math.floor(Math.random() * 10));
// }
//
// const randomCapitalRequired = valuation => {
//   // return valuation / Math.floor(Math.random() * 10);
//   return Math.floor(valuation * Math.random());
// }
//
// const randomLat = () => {
//   let lat = null;
//   while (lat === null || takenLat[lat]) {
//     lat = Math.floor(Math.random() * 90);
//   }
//   return lat;
// }
//
// const randomLng = () => {
//   let lng = null;
//   while (lng === null || takenLat[lng]) {
//     lng = Math.floor(Math.random() * 180);
//   }
//   return lng;
// }

//  const projectPitches = [];
//
// for(let i = 0; i < 5; i++) {
//   const title = `project${i}`;
//   const valuation = randomValuation();
//   const capitalRequired = randomCapitalRequired(valuation);
//   const lat = randomLat();
//   const lng = randomLng();
//   const voteForHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote for ${title}`}])
//   const voteAgainstHash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `vote against ${title}`}])
//
//   console.log("ABOUT TO PITCH")
//   console.log(developer)
//
//   projectInfo[i] = {
//     title, capitalRequired, valuation, lat, lng, voteForHash, voteAgainstHash
//   }
//
//   await crowdsale.pitchProject(title, capitalRequired, valuation, lat, lng, voteForHash, voteAgainstHash, {from: developer});
//   // projectPitches.push(projectPitch);
// }
// console.log('about to execute pitches')
// console.log(projectPitches[0])
// return await Promise.all(projectPitches);
