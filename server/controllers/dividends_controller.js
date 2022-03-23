const { web3 } = require("../chain_connection/web3_configuration");
const { sendTransaction } = require("../chain_util/chain_util");
const { fetchEvents } = require("../chain_util/chain_util");
const { numberParser } = require("../util/number_util");
const { merge } = require("lodash");
const { dividendsInstance, activeTokenInstace } = require("../chain_models/models");
const { dividendsAddress } = require("../chain_models/contract_addresses");

const fetchDividendReceptions = async () => {
  const dividendReceptions = await fetchEvents(dividendsInstance, "ReceiveDividends");

  return dividendReceptions
    .filter((event) => Number(event.returnValues.weiAmount) > 0)
    .map((event) => {
      const data = merge({}, event.returnValues);
      data.blockNumber = event.blockNumber;
      return data;
    });
};

//for now we will call this every time cashflows are received.
//in the future, we will call this on a quarterly invterval
const distributeDividends = async () => {
  const address = process.env.DEV_ACCOUNT;
  const privateKey = process.env.PRIVATE_KEY;

  const distributeDividend = async (investorId, nonce) => {
    const investorAddress = await activeTokenInstace.methods.investorById(investorId);

    return await sendTransaction(
      {
        nonce,
        to: dividendsAddress,
        value: 0,
        data: dividendsInstance.methods.distributeDividend(investorAddress).encodeABI(),
      },
      address,
      privateKey,
    );
  };

  let currentNonce = await web3.eth.getTransactionCount(address);
  const totalInvestors = await activeTokenInstace.methods.totalInvestors.call();
  const dividendDistributions = [];

  for (let investorId = 1; investorId <= totalInvestors; investorId++) {
    const dividendDistribution = distributeDividend(investorId, currentNonce);
    dividendDistributions.push(dividendDistribution);
    currentNonce++;
  }

  return Promise.all(dividendDistributions);
};

const collectDemoInvestorDividend = async () => {
  const address = process.env.DEV_ACCOUNT;
  const privateKey = process.env.PRIVATE_KEY;
  let nonce = await web3.eth.getTransactionCount(address);

  return await sendTransaction(
    {
      nonce,
      to: dividendsAddress,
      value: 0,
      data: dividendsInstance.methods.distributeDividend(address),
    },
    address,
    privateKey,
  );
};
module.exports = {
  fetchDividendReceptions,
  distributeDividends,
  collectDemoInvestorDividend,
};
