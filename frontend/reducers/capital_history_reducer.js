import { merge, values } from 'lodash';

import {
  RECEIVE_TOKEN_PURCHASES
} from '../actions/chain_actions/token_actions';

const capitalHistoryReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TOKEN_PURCHASES:
      // return values(action.projects)
      return (action.tokenPurchases);
    default:
      return state;
  }
};

export default capitalHistoryReducer;
