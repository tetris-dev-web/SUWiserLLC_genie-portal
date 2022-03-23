import * as ChainUtil from "../../util/chain_util";
import * as ExpressAPI from "../../util/fetch_util/express_api_util";
export const RECEIVE_RECEIVE_DIVIDENDS = "RECEIVE_RECEIVE_DIVIDENDS";

export const receiveReceiveDividends = (dividends) => {
  return {
    type: RECEIVE_RECEIVE_DIVIDENDS,
    dividends,
  };
};

export const collectDemoInvestorDividend = () => {
  return ExpressAPI.fetchApiData("demo/collect_investor_dividend");
};

export const fetchInvestorSummary = (account) => {
  return ExpressAPI.fetchApiData(`investor/summary/${account}`);
}