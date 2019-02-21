import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => {

  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveSessionErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const clearSessionErrors = () => {
  return {
    type: CLEAR_SESSION_ERRORS
  };
};

// Can refractor to implicit returns later like below
export const signup = user => dispatch => {
  return APIUtil.signup(user).then(user => {
    return dispatch(receiveCurrentUser(user));
  }, err => {
    return dispatch(receiveSessionErrors(err.responseJSON.errors));
  });
};

// Returning everything syntax for easier debugging
export const login = user => dispatch => {
  return APIUtil.login(user).then(user => {
    return dispatch(receiveCurrentUser(user));
  }, err => {
    return dispatch(receiveSessionErrors(err.responseText));
  });
};

export const logout = () => dispatch => {
  return APIUtil.logout().then(user => {
    return dispatch(receiveCurrentUser(null));
  });
};
