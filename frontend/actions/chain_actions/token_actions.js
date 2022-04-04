import * as ChainUtil from "../../util/chain_util";
import * as ExpressAPI from "../../util/fetch_util/express_api_util";
export const RECEIVE_TOKEN_GRAPH_DATA = "RECEIVE_TOKEN_GRAPH_DATA";
export const RECEIVE_TOKEN_PURCHASE = "RECEIVE_TOKEN_PURCHASE";
export const RECEIVE_CAPITAL_HISTORY = "RECEIVE_CAPITAL_HISTORY";
export const RECEIVE_TOKEN_TRANSFER = "RECEIVE_TOKEN_TRANSFER";

//separate out non store interactions,

export const receiveTokenGraphData = (tokenGraphData, currentViewType) => {
  //no need to export?

  return {
    type: RECEIVE_TOKEN_GRAPH_DATA,
    tokenGraphData,
    currentViewType,
  };
};

export const receiveTokenPurchase = (tokenPurchase) => {
  return {
    type: RECEIVE_TOKEN_PURCHASE,
    tokenPurchase,
  };
};

export const receiveCapitalHistory = (capitalHistory) => {
  return {
    type: RECEIVE_CAPITAL_HISTORY,
    capitalHistory,
  };
};

export const buyTokens = (crowdsale, account, value) => {
  // return dispatch => {
  return ChainUtil.buyTokens(crowdsale, account, value);
  // .then(() => {
  // receiveTokenPurchase({blockNumber: event.blockNumber, value: Number(event.args.value)});
  // notifyTransactionCompletion({notification: "Your token purchase transaction has been mined to the blockchain."});
  // })
  // }
};

export const buyTokensWithDemoInvestor = (wei) => {
  return ExpressAPI.fetchApiData("demo/buy_tokens", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wei,
    }),
  });
};

export const fetchCapitalHistory = (crowdsale) => {
  return (dispatch) => {
    return ExpressAPI.fetchApiData("capital_history_data").then((capitalHistory) => {
      return dispatch(receiveCapitalHistory(capitalHistory));
    });
  };
};

export const fetchTokenGraphData = (currentViewType, account = null) => {
  return (dispatch) => {
    return ExpressAPI.fetchApiData(`token_graph_data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentViewType, account }),
    }).then((tokenGraphData) => {
      return dispatch(receiveTokenGraphData(tokenGraphData, currentViewType));
    });
  };
};

export const activateDemoInvestorPending = () => {
  return ExpressAPI.fetchApiData("demo/activate_investor_pending");
};

export const fetchTokenBalances = (inactiveToken, activeToken, account) => {
  return ChainUtil.fetchTokenBalances(inactiveToken, activeToken, account);
};

export const fetchDemoInvestorBalances = () => {
  return ExpressAPI.fetchApiData("demo/fetch_investor_balance");
};

export const fetchTokenHistory = (account) => {
  return ExpressAPI.fetchApiData(`investor/token_history/${account}`);
}

export const fetchPurchaseHistory = (account) => {
  return ExpressAPI.fetchApiData(`investor/purchase_history/${account}`);
}

export const receiveTokenTransfer = (tokenTransfer) => {
  return {
    type: RECEIVE_TOKEN_TRANSFER,
    tokenTransfer,
  };
};