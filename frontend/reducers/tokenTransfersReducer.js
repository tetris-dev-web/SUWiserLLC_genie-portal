import {
  RECEIVE_TOKEN_TRANSFERS
} from '../actions/chain_actions/token_actions';

const tokenTransfersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TOKEN_TRANSFERS:
      return (action.tokenTransferLogs);
    default:
      return state;
  }
};

export default tokenTransfersReducer;
