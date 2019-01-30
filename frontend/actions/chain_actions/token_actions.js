import * as ChainUtil from '../../util/chain_util';
const RECEIVE_TOKEN_PURCHASES = "RECEIVE_TOKEN_PURCHASES";


export const receiveTokenPurchases = tokenPurchases => {
  return {
    type: RECEIVE_TOKEN_PURCHASES,
    tokenPurchases
  }
}

export const buyTokens = (crowdsale, account, value) => {
  return ChainUtil.buyTokens(crowdsale, account, value)
}

export const fetchTokenPurchaseLogs  = (crowdsale, web3) => {
  return dispatch => {
    return ChainUtil.fetchTokenPurchaseLogs(crowdsale, web3).then((tokenPurchases) => {
      return dispatch(receiveTokenPurchases(tokenPurchases));
    });
  };
};
