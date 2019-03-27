import * as ChainUtil from '../../util/chain_util';
export const RECEIVE_RECEIVE_DIVIDENDS = "RECEIVE_RECEIVE_DIVIDENDS";


export const receiveReceiveDividends = dividends => {
  return {
    type: RECEIVE_RECEIVE_DIVIDENDS,
    dividends
  }
}
