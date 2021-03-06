import * as ExpressAPI from "../util/fetch_util/express_api_util";

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};

export const fetchUser = (address, email) => {
  return (dispatch) => {
    if (address != '') {
      return ExpressAPI.fetchApiData(`user/address/${address}`);
    } else if (email != '') {
      return ExpressAPI.fetchApiData(`user/email/${email}`);
    }
  };
};

export const updateUser = (profile) => (dispatch) => {
  return ExpressAPI.fetchApiData(`user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });
};
