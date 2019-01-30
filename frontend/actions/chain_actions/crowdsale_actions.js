export const fetchCrowdsaleLogs = (crowdsale, web3) => {
  return dispatch => {
    return ChainUtil.fetchProjectActivationLogs(crowdsale, web3)
  }
}
