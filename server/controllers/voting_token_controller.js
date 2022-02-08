const { votingTokenInstance } = require('../chain_models/models');

const demoInvestorFreeVotes = async () => {
  return await votingTokenInstance.methods
    .freedUpBalanceOf('0xef898fd948f50d5010d3ec20233fae23d89a1a51')
    .call();
};

module.exports = {
  demoInvestorFreeVotes,
};
