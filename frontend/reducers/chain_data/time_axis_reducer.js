import merge from "lodash/merge";
import { RECEIVE_START_AND_END_TIME } from "../../actions/chain_actions/time_axis_actions";

const timeAxis = (state = [], action) => {
  // console.log("actionsFromTimeAxis:",action);
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_START_AND_END_TIME:
      return action.startAndEndTime; //merge({}, { startAndEndTime });
    default:
      return state;
  }
};

export default timeAxis;
