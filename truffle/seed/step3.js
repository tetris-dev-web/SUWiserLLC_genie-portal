const ProjectFactory = artifacts.require("ProjectFactory");
const InactiveToken = artifacts.require("InactiveToken");
const SeedableCrowdsale = artifacts.require("SeedableCrowdsale");
const Voting = artifacts.require("Voting");
const { getProjectAddresses } = require('./util');


module.exports = async () => {
  const createTokenPurchases = async () => {
    const createTokenPurchase = async (address, weiAmount) => {
      await crowdsale.seedTokens({from: address, value: weiAmount});
    };

    await createTokenPurchase(account, 100);
    console.log('purchase 3 complete');
    await createTokenPurchase(account, 100);
    console.log('purchase 4 complete');
  };

  const createVotes = async () => {
    const castVote = async (projectAddress, voteAmount) => {
      await voting.voteForProject(projectAddress, voteAmount, {from: account});
    }

    await castVote(projAddrs[5], 60);
    console.log('vote 4 complete')
    await castVote(projAddrs[3], 40);
    console.log('vote 5 complete');
  }

  const activateTokens = async () => {
    await token.activatePending(account);
  }

  const account = web3.currentProvider.addresses[0];
  const projectFactory = await ProjectFactory.deployed();
  const token = await InactiveToken.deployed();
  const crowdsale = await SeedableCrowdsale.deployed();
  const voting = await Voting.deployed();

  const projAddrs = await getProjectAddresses(projectFactory);
  console.log("PROJECT ADDRESSES:", projAddrs);
  await createTokenPurchases();
  console.log("BUYS COMPLETE");
  await createVotes();
  console.log("VOTES COMPLETE")
  await activateTokens();
  console.log("TOKENS ACTIVATED");
  return null;
}
