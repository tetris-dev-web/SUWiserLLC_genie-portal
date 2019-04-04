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



const fetchEndTime = async () => {
  const {inactiveTransferData, activeTransferData } = await fetchTokenTransfers();
  const lastEventofActiveTokenTransfers = inactiveTransferData[activeTransferData.length-1].blockNumber;
  const lastEventofInActiveTokenTransfers = activeTransferData[activeTransferData.length-1].blockNumber;
  const endTime = Math.max(lastEventofActiveTokenTransfers,lastEventofInActiveTokenTransfers);  // Time.now()
  return endTime;
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

const fetchInvestorBalance = async () => {
  const account = "0xef898fd948f50d5010d3ec20233fae23d89a1a51";
  const accountInactive = await inactiveTokenInstance.methods.balanceOf(account).call();
  const accountActive = await activeTokenInstance.methods.balanceOf(account).call();
  console.log(accountInactive, accountActive)
  return {
    accountInactive,
    accountActive
  }
}

module.exports = {
  fetchTokenHistoryWithEarnings,
  fetchInvestorBalance,
  fetchEndTime
}
