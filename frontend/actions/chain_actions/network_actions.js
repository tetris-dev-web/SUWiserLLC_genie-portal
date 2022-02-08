export const UPDATE_NETWORK = "UPDATE_NETWORK";
export const CLEAR_NETWORK_ACCOUNT = "CLEAR_NETWORK_ACCOUNT";

export const updateNetwork = network => {
  return dispatch => {
    return dispatch({
      type: UPDATE_NETWORK,
      network
    })
  }
}
