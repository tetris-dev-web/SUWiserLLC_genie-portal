const { fetchPurchases} = require('../chain_api/crowdsale_chain_api');
const { formatCapitalHistoryData } = require('../formatters/capital_history_data');

const capitalHistoryData = async () => {
  const tokenPurchases = await fetchPurchases();
  return formatCapitalHistoryData(tokenPurchases);
}

module.exports = {
  capitalHistoryData
}
