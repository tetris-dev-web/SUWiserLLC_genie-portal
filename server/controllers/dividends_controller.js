const { fetchEvents } = require('../chain_util/chain_util');
const { numberParser } = require('../util/number_util');
const { merge } = require('lodash');
const { dividendsInstance } = require('../chain_models/models');

const fetchDividendReceptions = async () => {
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
