import { merge } from "lodash";

const settingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case 'SETTINGS_UPDATE_CURRENCY':
      return merge({}, state, {currency : action.currency});
    default:
      return state;
  }
};

export default settingsReducer;