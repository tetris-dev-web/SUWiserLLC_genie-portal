import * as ChainUtil from '../../util/chain_util';
export const RECEIVE_TOKEN_PURCHASES = "RECEIVE_TOKEN_PURCHASES";
export const RECEIVE_TOKEN_PURCHASE = "RECEIVE_TOKEN_PURCHASE";
export const RECEIVE_TOKEN_TRANSFERS = "RECEIVE_TOKEN_TRANSFERS";
export const RECEIVE_TOKEN_TRANSFER = "RECEIVE_TOKEN_TRANSFER";


export const receiveTokenPurchases = tokenPurchases => { //no need to export?
  return {
    type: RECEIVE_TOKEN_PURCHASES,
    tokenPurchases
  }
}

export const receiveTokenPurchase = tokenPurchase => {
  return {
    type: RECEIVE_TOKEN_PURCHASE,
    tokenPurchase
  }
}

export const buyTokens = (crowdsale, account, value) => {
  return ChainUtil.buyTokens(crowdsale, account, value)
}

export const fetchTokenPurchaseLogs  = (crowdsale) => {
  return dispatch => {
    return ChainUtil.fetchTokenPurchaseLogs(crowdsale, dispatch, receiveTokenPurchases)
  };
};

export const fetchAllTokenTransferLogs = (inactiveToken, activeToken) => {
  return dispatch => {
    return ChainUtil.fetchAllTokenTransferLogs(inactiveToken, activeToken,receiveAllTokenTransfers, dispatch);
  }
}

export const fetchTokenBalances = (inactiveToken, activeToken, account) => {
  return ChainUtil.fetchTokenBalances(inactiveToken, activeToken, account);
}


export const receiveAllTokenTransfers = tokenTransferLogs => {
  return {
    type: RECEIVE_TOKEN_TRANSFERS,
    tokenTransferLogs
  }
}

export const receiveTokenTransfer = tokenTransfer => {
  return {
    type: RECEIVE_TOKEN_TRANSFER,
    tokenTransfer
  }
}
