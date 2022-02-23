const { votingTokenInstance } = require("../chain_models/models");

const demoInvestorFreeVotes = async () => {
  return await votingTokenInstance.methods.freedUpBalanceOf(process.env.DEV_ACCOUNT).call();
};

module.exports = {
  demoInvestorFreeVotes,
};
