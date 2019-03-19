const { web3Instance } = require('../chain_connection/contracts');
const { fetchEvents } = require('../chain_connection/events');
const { numberParser } = require('../util/number_util');
const { merge } = require('lodash');
const Dividends = require('../../truffle/build/contracts/Dividends.json');

const fetchDividendReceptions = async () => {
  const dividendsInstance = await web3Instance(Dividends, "0xbeb820334624e21b57566506403f3aa3ddf7cbf9");
  const dividendReceptions = await fetchEvents(dividendsInstance, 'ReceiveDividends');

  return dividendReceptions.filter(event => Number(event.returnValues.weiAmount) > 0).map(event => {
    const data = merge({}, event.returnValues);
    data.blockNumber = event.blockNumber;
    return data;
  })
}

module.exports = {
  fetchDividendReceptions
}
