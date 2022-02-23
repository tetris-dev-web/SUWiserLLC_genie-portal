// not seeing use here

import * as APIUtil from "../util/user_api_util";

// ADDED
import { receiveCurrentUser } from "./session_actions";

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};

export const fetchUser = (id) => (dispatch) => {
  return APIUtil.fetchUser(id).then((user) => {
    return dispatch(receiveCurrentUser(user));
  });
};

export const updateUser = (user) => (dispatch) => {
  return APIUtil.updateUser(user).then((res) => {
    // changed to receiveCurrentUser so that state is updated
    return dispatch(receiveCurrentUser(res), (err) => {
      return dispatch(receiveSessionErrors(err.responseText));
    });
  });
};
