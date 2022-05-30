import { merge, values } from "lodash";

import {
  RECEIVE_CAPITAL_HISTORY,
  RECEIVE_TOKEN_PURCHASE,
} from "../actions/chain_actions/token_actions";

const capitalHistoryReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CAPITAL_HISTORY:
      return action.capitalHistory;
    case RECEIVE_TOKEN_PURCHASE:
      const { tokenPurchase } = action;
      const newState = merge({}, state);

      if (newState.history) {
        const lastRecordLen = newState.history.length - 1;
        const lastRecord = newState.history[lastRecordLen];

        const newRecord = {
          date: Number(tokenPurchase.blockNumber),
          capital: lastRecord.capital + Number(tokenPurchase.value),
        };

        if (lastRecord.date !== Number(tokenPurchase.blockNumber)) {
          newState.history.push(newRecord);
          newState.capitalTotal += Number(tokenPurchase.value);
          newState.endTime = Number(tokenPurchase.blockNumber);
        }
      }
      return newState;
    default:
      return state;
  }
};

export default capitalHistoryReducer;
