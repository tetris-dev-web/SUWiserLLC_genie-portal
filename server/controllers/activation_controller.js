const { web3 } = require('../chain_connection/web3_configuration');
const { activationInstance } = require('../chain_models/models');
const { activationAddress } = require('../chain_models/contract_addresses');
const { sendTransaction } = require('..//chain_util/chain_util');

const attemptProjectActivation = async () => {
  const address = '0xef898fd948f50d5010d3ec20233fae23d89a1a51';
  const privateKey = process.env.PRIVATE_KEY;
  const nonce = await web3.eth.getTransactionCount(address);

  await sendTransaction(
    {
      nonce,
      gasLimit: web3.utils.toHex(4700000),
      to: activationAddress,
      value: 0,
      data: activationInstance.methods.tryActivateProject().encodeABI(),
    },
    address,
    privateKey,
  );
};

module.exports = {
  attemptProjectActivation,
};
