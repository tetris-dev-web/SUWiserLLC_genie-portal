import * as ChainUtil from '../../util/chain_util';
export const RECEIVE_TOKEN_PURCHASES = "RECEIVE_TOKEN_PURCHASES";


export const receiveTokenPurchases = tokenPurchases => {
  console.log("tokenPurchases", tokenPurchases)
  return {
    type: RECEIVE_TOKEN_PURCHASES,
    tokenPurchases
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