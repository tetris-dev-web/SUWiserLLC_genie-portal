import merge from "lodash/merge";
import { RECEIVE_USER } from "../actions/user_actions";

const _nullUser = Object.freeze({
  currentUser: null,
});

const userReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      const currentUser = action.currentUser;
      return merge({}, { currentUser });
    default:
      return state;
  }
};

export default userReducer;
