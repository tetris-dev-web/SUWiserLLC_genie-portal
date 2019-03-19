const { fetchTokenTransfers } = require('../chain_api/token_chain_api');
const { fetchDividendReceptions } = require('../chain_api/dividends_chain_api');
const { formatTokenGraphData } = require('../formatters/token_graph');

const tokenGraphData = async (currentViewType, account) => {
  const tokenTransfers = await fetchTokenTransfers();
  const dividendReceptions = await fetchDividendReceptions();
  return formatTokenGraphData(tokenTransfers, dividendReceptions, currentViewType, account);
}

module.exports = {
  tokenGraphData
}
