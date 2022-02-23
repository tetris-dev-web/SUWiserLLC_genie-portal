const { web3 } = require('../chain_connection/web3_configuration');
const { fetchEvents } = require('../chain_util/chain_util');
const { numberParser } = require('../util/number_util');
const { crowdsaleInstance } = require('../chain_models/models');
const { crowdsaleAddress } = require('../chain_models/contract_addresses');
const { formatCapitalHistoryData } = require('../formatters/capital_history');
const { sendTransaction } = require('../chain_util/chain_util');
const { attemptProjectActivation } = require('./activation_controller');
const { dotenv } = require('../chain_connection/web3_configuration');

const fetchWeiRaised = async () => {
  return await numberParser(crowdsaleInstance.methods.weiRaised_());
}

const fetchPurchases = async () => {
  const tokenPurchases = await fetchEvents(crowdsaleInstance, 'TokenPurchase');

  return formatCapitalHistoryData(tokenPurchases);
}


const buyTokens = async wei => {
  //using demo account for now
  const address = process.env.DEMO_ACCOUNT;
  const privateKey = process.env.PRIVATE_KEY;
  const nonce = await web3.eth.getTransactionCount(address);

  const transaction = await sendTransaction(
    {
      nonce,
      to: crowdsaleAddress,
      value: web3.utils.toHex(wei),
      data: crowdsaleInstance.methods.buyTokens().encodeABI()
    },
    address,
    privateKey
  );

  console.log(
    "TRANSACTION:",
    transaction
  )

  await attemptProjectActivation();

}

module.exports = {
  fetchWeiRaised,
  fetchPurchases,
  buyTokens
}
