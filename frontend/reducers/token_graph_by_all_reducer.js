import {
  RECEIVE_TOKEN_GRAPH_DATA,
  RECEIVE_TOKEN_TRANSFER
} from '../actions/chain_actions/token_actions';
import { merge } from 'lodash';

const tokenGraphByAllReducer = (state = [], action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_TOKEN_GRAPH_DATA:

      if (action.currentViewType === 'BY ALL') {
        return action.tokenGraphData;
      }
      return state;
    case RECEIVE_TOKEN_TRANSFER:
      if (state.length) {
        const { tokenTransfer } = action;
        const { type, event } = tokenTransfer;
        const { to, from, args } = event;
        newState = merge([], state);
        let { activeTokens, totalTokens, earnings, date } = newState[newState.length - 1];

        if (from == "0x0000000000000000000000000000000000000000") {
          if (type == 'inactive') {
            totalTokens += args.value;
          } else {
            activeTokens += args.value;
          }
        }

        const nextData = {
          date: blockNumber,
          activeToken,
          totalTokens,
          earnings
        };

        if (date === blockNumber) {
          newState[newState.length - 1] = nextData;
        } else {
          newState.push(nextData);
        }

        return newState;
      }

      return state;
    default:
    return state;
  }
}
export default tokenGraphByAllReducer;
