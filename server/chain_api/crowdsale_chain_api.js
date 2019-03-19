const { web3Instance } = require('../chain_connection/contracts');
const { fetchEvents } = require('../chain_connection/events');
const { numberParser } = require('../util/number_util');
const GNITokenCrowdsale = require('../../truffle/build/contracts/GNITokenCrowdsale.json');

const fetchWeiRaised = async () => {
  const crowdsaleInstance = await _web3Instance();
  return await numberParser(crowdsaleInstance.methods.weiRaised_());
}

const fetchPurchases = async () => {
  const crowdsaleInstance = await _web3Instance();
  return await fetchEvents(crowdsaleInstance, 'TokenPurchase');
}

const _web3Instance = async () => {
  return await web3Instance(GNITokenCrowdsale, "0x52b554d9f419f9d0e8b8c3fb9d9dc266cbe329c4");
}

module.exports = {
  fetchWeiRaised,
  fetchPurchases
}
