import * as ExpressAPI from "../../util/fetch_util/express_api_util";
export const RECEIVE_START_AND_END_TIME = "RECEIVE_START_AND_END_TIME";

export const fetchStartAndEndTimes = () => {
  return (dispatch) => {
    return ExpressAPI.fetchApiData("fetchStartAndEndTimes").then((result) => {
      return dispatch(receiveStartAndEndTimes(result));
    });
  };
};
/**,
    {
      method: 'GET',
      body:'{}'
    } */

export const receiveStartAndEndTimes = (startAndEndTime) => {
  return {
    type: RECEIVE_START_AND_END_TIME,
    startAndEndTime,
  };
};
