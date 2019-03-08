import * as ChainUtil from '../../util/chain_util';
export const RECEIVE_RECEIVE_DIVIDEND = "RECEIVE_RECEIVE_DIVIDEND";
export const RECEIVE_RECEIVE_DIVIDENDS = "RECEIVE_RECEIVE_DIVIDENDS";

export const receiveReceiveDividendsLog = log => {
  return {
    type: RECEIVE_RECEIVE_DIVIDEND,
    log
  }
}

export const receiveReceiveDividendsLogs = logs => {
  return {
    type: RECEIVE_RECEIVE_DIVIDENDS,
    logs
  }
}

export const fetchReceiveDividendsLogs = dividends => {
  return dispatch => {
    return ChainUtil.fetchReceiveDividendsLogs(dividends, receiveReceiveDividendsLogs, dispatch);
  }
}
