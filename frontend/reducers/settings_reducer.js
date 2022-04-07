import { merge } from "lodash";

const settingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case 'SETTINGS_UPDATE_CURRENCY':
      return merge({}, state, {currency : action.currency});
    case 'SETTINGS_UPDATE_ETH2USD':
      return merge({}, state, {eth2usd : action.eth2usd});
    default:
      return state;
  }
};

export default settingsReducer;