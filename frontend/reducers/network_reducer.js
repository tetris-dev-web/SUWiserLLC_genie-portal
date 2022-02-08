import { UPDATE_NETWORK, CLEAR_NETWORK_ACCOUNT } from '../actions/chain_actions/network_actions';
import { merge } from 'lodash';

const networkReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_NETWORK:
      return merge({}, state, action.network);
    default:
    return state;
  }
};

export default networkReducer;
