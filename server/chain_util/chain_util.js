const { web3 } = require("../chain_connection/web3_configuration");
const Tx = require("ethereumjs-tx");

const sendTransaction = async (details, address, privateKey) => {
  details.gasPrice = details.gasPrice
    ? details.gasPrice
    : web3.utils.toHex(web3.utils.toWei("3", "gwei"));
  details.gasLimit = details.gasLimit ? details.gasLimit : web3.utils.toHex(1000000);

  const transaction = new Tx(details);
  transaction.sign(Buffer.from(privateKey, "hex"));

  const serializedTransaction = transaction.serialize();
  const rawData = "0x" + serializedTransaction.toString("hex");

  return await web3.eth.sendSignedTransaction(rawData);
};

const fetchEvents = async (instance, eventName, filter = {}, fromBlock = 0, toBlock = "latest") => {
  return await instance.getPastEvents(eventName, {
    filter,
    fromBlock,
    toBlock,
  });
};

module.exports = {
  sendTransaction,
  fetchEvents,
};
