import { RECEIVE_PROJECT_GRAPH_DATA } from "../actions/chain_actions/project_actions";

const capitalBeingRaisedReducer = (state = 0, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECT_GRAPH_DATA:
      return action.weiRaised;
    default:
      return state;
  }
};

export default capitalBeingRaisedReducer;
