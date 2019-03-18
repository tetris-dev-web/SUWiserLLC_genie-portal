const { web3Instance } = require('../chain_connection/contracts');
const { fetchEvents } = require('../chain_connection/events');
const { numberParser } = require('../util/number_util');
const GNITokenCrowdsale = require('../../truffle/build/contracts/GNITokenCrowdsale.json');

const fetchWeiRaised = async () => {
  const crowdsaleInstance = await web3Instance(GNITokenCrowdsale, "0x52b554d9f419f9d0e8b8c3fb9d9dc266cbe329c4");
  return await numberParser(crowdsaleInstance.methods.weiRaised_);
}

module.exports = {
  fetchWeiRaised
}
