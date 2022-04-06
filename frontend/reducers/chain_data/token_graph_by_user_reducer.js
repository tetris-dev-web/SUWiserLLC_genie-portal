import {
  RECEIVE_TOKEN_GRAPH_DATA,
  RECEIVE_TOKEN_TRANSFER,
} from "../../actions/chain_actions/token_actions";
import { merge } from "lodash";

const tokenGraphByUserReducer = (state = null, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_TOKEN_GRAPH_DATA:
      if (action.currentViewType === "BY USER") {
        return action.tokenGraphData;
      }
      return state;
    case RECEIVE_TOKEN_TRANSFER:
      const { tokenTransfer } = action;
      const { type, event, account, blockNumber } = tokenTransfer;
      const { to, from, args } = event;

      if (state.length && (to === account || from === account)) {
        newState = merge([], state);
        let { activeTokens, totalTokens, earnings, date } = newState[newState.length - 1];

        if (to === account) {
          //if the account's overall balance is increasing
          if (type == "inactive" || from !== "0x0000000000000000000000000000000000000000") {
            totalTokens += args.value;
          }
          if (type == "active") {
            //if the accounts own tokens were activated
            activeTokens += args.value;
          }
        } else {
          //if the account is doing the transfering
          //if the account is losing overall tokens
          if (type == "active" || to !== "0x0000000000000000000000000000000000000000") {
            totalTokens -= args.value;
          }
          if (type === "active") {
            activeTokens -= args.value;
          }
        }

        const nextData = {
          activeTokens,
          totalTokens,
          date: blockNumber,
          earnings,
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
};

export default tokenGraphByUserReducer;
