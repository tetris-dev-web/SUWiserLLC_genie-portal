const { web3Instance } = require('../chain_connection/contracts');
const { fetchEvents } = require('../chain_connection/events');
const { numberParser } = require('../util/number_util');
const { merge } = require('lodash');
const InactiveToken = require('../../truffle/build/contracts/InactiveToken.json');
const ActiveToken = require('../../truffle/build/contracts/ActiveToken.json');

const fetchTokenTransfers = async () => {
  const inactiveTokenInstance = web3Instance(InactiveToken, "0x19e4f9f6f4fb5c52255fe70dfefd061cce754452");
  const activeTokenInstance = web3Instance(ActiveToken, "0x90c8903d589de9df9e672f5e9fd9429b015850ba");

  const inactiveTransferData = await transfersData(inactiveTokenInstance);
  const activeTransferData = await transfersData(activeTokenInstance);

  return {
    inactiveTransferData,
    activeTransferData
  };
}

const transfersData = async (tokenInstance) => {
  const events = await fetchEvents(tokenInstance, 'Transfer');

  return events.filter(event => Number(event.returnValues.value) > 0).map(event => {
    const data = merge({}, event.returnValues);
    data.blockNumber = event.blockNumber;
    data.value = Number(data.value);
    return data;
  })
}

module.exports = {
  fetchTokenTransfers
}
