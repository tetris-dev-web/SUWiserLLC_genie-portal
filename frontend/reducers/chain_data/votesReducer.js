import { merge, values } from "lodash";

import { RECEIVE_FREE_VOTES, RECEIVE_PROJECT_VOTES } from "../../actions/chain_actions/votes_actions";

const votesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_FREE_VOTES:
      newState = merge({}, state);
      newState.freeVotes = action.votes;
      return newState;
    case RECEIVE_PROJECT_VOTES:
      newState = merge({}, state);
      newState[action.projectAddr] = action.votes;
      return newState;
    default:
      return state;
  }
};

export default votesReducer;
