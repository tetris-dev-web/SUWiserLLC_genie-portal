const { fetchEvents } = require('../chain_util/chain_util');
const { numberParser } = require('../util/number_util');
const { merge } = require('lodash');
const { formatTokenGraphData } = require('../formatters/token_graph');
const { fetchDividendReceptions } = require('./dividends_controller');
const { inactiveTokenInstance, activeTokenInstance } = require('../chain_models/models');

const fetchTokenHistoryWithEarnings = async (currentViewType, account) => {
  const dividendReceptions = await fetchDividendReceptions();
  const tokenTransfers = await fetchTokenTransfers();
  return formatTokenGraphData(tokenTransfers, dividendReceptions, currentViewType, account);
}

const fetchTokenTransfers = async () => {
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
  fetchTokenHistoryWithEarnings
}
