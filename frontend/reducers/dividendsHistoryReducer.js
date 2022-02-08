import {
  RECEIVE_RECEIVE_DIVIDEND,
  RECEIVE_RECEIVE_DIVIDENDS
} from '../actions/chain_actions/dividends_actions';
import { merge } from 'lodash';

const dividendsHistoryReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RECEIVE_DIVIDENDS:
      return (action.logs);
    case RECEIVE_RECEIVE_DIVIDEND:
      const newState = merge([], state);
      newState.push(action.log);
      return newState;
    default:
      return state;
  }
};

export default dividendsHistoryReducer;
