import { merge, values } from 'lodash';

import {
  RECEIVE_TOKEN_PURCHASES,
  RECEIVE_TOKEN_PURCHASE
} from '../actions/chain_actions/token_actions';

const capitalHistoryReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TOKEN_PURCHASES:
      return (action.tokenPurchases);
    case RECEIVE_TOKEN_PURCHASE:
      const newState = merge({}, state);
      if (newState[action.tokenPurchase.time]) {
        newState[action.tokenPurchase.time] += action.tokenPurchase.value;
      } else {
        newState[action.tokenPurchase.time] = action.tokenPurchase.value;
      }
      return newState;
    default:
      return state;
  }
};

export default capitalHistoryReducer;
