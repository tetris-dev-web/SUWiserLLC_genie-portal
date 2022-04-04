const { web3 } = require("../chain_connection/web3_configuration");
const { fetchEvents } = require("../chain_util/chain_util");
const { numberParser } = require("../util/number_util");
const { merge } = require("lodash");
const { formatTokenGraphData } = require("../formatters/token_graph");
const { fetchDividendReceptions } = require("./dividends_controller");
const {
  inactiveTokenInstance,
  activeTokenInstance,
  dividendsInstance,
} = require("../chain_models/models");
const { inactiveTokenAddress } = require("../chain_models/contract_addresses");
const { sendTransaction } = require("../chain_util/chain_util");

const fetchTokenHistoryWithEarnings = async (currentViewType, account) => {
  const dividendReceptions = await fetchDividendReceptions();
  const tokenTransfers = await fetchTokenTransfers();

  return formatTokenGraphData(tokenTransfers, dividendReceptions, currentViewType, account);
};

const fetchEndTime = async () => {
  const { inactiveTransferData, activeTransferData } = await fetchTokenTransfers();
  const lastEventofActiveTokenTransfers =
    inactiveTransferData[inactiveTransferData.length - 1].blockNumber;
  const lastEventofInActiveTokenTransfers =
    activeTransferData[activeTransferData.length - 1].blockNumber;
  const endTime = Math.max(lastEventofActiveTokenTransfers, lastEventofInActiveTokenTransfers); // Time.now()
  return endTime;
};

const fetchTokenTransfers = async (account = '') => {
  const inactiveTransferData = await transfersData(inactiveTokenInstance, account);
  const activeTransferData = await transfersData(activeTokenInstance, account);

  return {
    inactiveTransferData,
    activeTransferData,
  };
};

const transfersData = async (tokenInstance, account = '') => {
  const events = await fetchEvents(tokenInstance, "Transfer");

  return events
    .filter((event) => Number(event.returnValues.value) > 0 && (account == '' ? true : (account != '' && ( String(event.returnValues.from).toLowerCase() == String(account).toLowerCase() || String(event.returnValues.to).toLowerCase() == String(account).toLowerCase()))))
    .map((event) => {
      const data = merge({}, {
        from : event.returnValues.from,
        to : event.returnValues.to,
        blockNumber : event.blockNumber,
        time : Number(event.returnValues.time),
        value : Number(event.returnValues.value)
      });
      return data;
    });
};

const fetchInvestorBalance = async () => {
  const account = process.env.DEV_ACCOUNT;
  const accountInactive = await inactiveTokenInstance.methods.balanceOf(account).call();
  const accountActive = await activeTokenInstance.methods.balanceOf(account).call();
  const accountPending = await inactiveTokenInstance.methods.pendingActivations(account).call();
  const accountDividend = await dividendsInstance.methods.dividendOwedTo(account).call();
  const accountBalance = await web3.eth.getBalance(account);
  
  return {
    account,
    accountBalance,
    accountInactive,
    accountActive,
    accountPending,
    accountDividend,
  };
};

const activateDemoInvestorPending = async () => {
  const address = process.env.DEV_ACCOUNT;
  const privateKey = process.env.PRIVATE_KEY;
  let nonce = await web3.eth.getTransactionCount(address);

  return await sendTransaction(
    {
      nonce,
      to: inactiveTokenAddress,
      value: 0,
      data: inactiveTokenInstance.methods.activateDemoInvestorPending(address),
    },
    address,
    privateKey,
  );
};

module.exports = {
  fetchTokenHistoryWithEarnings,
  fetchInvestorBalance,
  activateDemoInvestorPending,
  fetchEndTime,
  fetchTokenTransfers
};
