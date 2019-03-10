import {
  RECEIVE_TOKEN_TRANSFERS,
  RECEIVE_TOKEN_TRANSFER
} from '../actions/chain_actions/token_actions';
import { merge } from 'lodash';

const tokenTransfersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TOKEN_TRANSFERS:
      return (action.tokenTransferLogs);
    case RECEIVE_TOKEN_TRANSFER:
      const newState = merge({}, state);
      if (action.tokenTransfer.type === 'inactive') {
        console.log("reducer newState", newState)
        newState.inactiveTransferLogs.push(action.tokenTransfer.data)
      } else {
        newState.activeTransferLogs.push(action.tokenTransfer.data)
      }
      return newState;
    default:
      return state;
  }
};

export default tokenTransfersReducer;
