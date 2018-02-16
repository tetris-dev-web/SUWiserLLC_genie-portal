// not seeing use here

import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};

export const fetchUser = id => dispatch => {
  return APIUtil.fetchUser(id).then(user => {
    return dispatch(receiveUser(user));
  });
};

export const updateUser = user => dispatch => {
  return APIUtil.updateUser(user).then(res => {
    return dispatch(receiveUser(res));
  });
};
