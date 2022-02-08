const { web3 } = require('../chain_connection/web3_configuration');
const TruffleContract = require('truffle-contract');

const web3Instance = (contract, instanceAddress) => {
  const truffleContract = TruffleContract(contract);
  truffleContract.setProvider(web3.currentProvider);
  const truffleInstance = truffleContract.at(instanceAddress);
  return new web3.eth.Contract(truffleInstance.abi, instanceAddress);
};

const truffleContract = (contract) => {
  const truffleContract = TruffleContract(contract);
  truffleContract.setProvider(web3.currentProvider);
  return truffleContract;
};

module.exports = {
  web3Instance,
  truffleContract,
};
