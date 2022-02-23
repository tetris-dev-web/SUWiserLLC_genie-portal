const { projectFactoryInstance } = require('../chain_models/models');
const { projectFactoryAddress } = require('../chain_models/contract_addresses');
const { web3 } = require('../chain_connection/web3_configuration');
const { dotenv } = require('../chain_connection/web3_configuration');
const { sendTransaction } = require('../chain_util/chain_util');
const { fetchEvents } = require('../chain_util/chain_util');


const fetchStartTime = async () => {
  const lastProjecPitch = await fetchEvents(projectFactoryInstance, 'ProjectPitch');
  return lastProjecPitch[0].blockNumber; // in demo mode, need to switch time scale for live version
}


const pitchProject = async params => {
  let {
    title,
    description,
    capital_required,
    valuation,
    latitude,
    longitude,
    cashflow,
    busLink
  } = params;

  const projectInfo = JSON.stringify({
    title,
    description,
    busLink,
    lat: latitude,
    lng: longitude
  });
  //using a demo account for now
  const address = process.env.DEMO_ACCOUNT;
  const privateKey = process.env.PRIVATE_KEY;
  const nonce = await web3.eth.getTransactionCount(address);

  const developer = await projectFactoryInstance.methods.developer().call();

  const recipt = await sendTransaction(
    {
      nonce,
      gasLimit: web3.utils.toHex(5000000),
      to: projectFactoryAddress,
      value: 0,
      data: projectFactoryInstance.methods.createProject(
        projectInfo,
        Math.round(valuation),
        Math.round(capital_required),
        cashflow
      ).encodeABI(),
    },
    address,
    privateKey
  )
  
  console.log(recipt);

  return null;
}

module.exports = {
  pitchProject,
  fetchStartTime
}
