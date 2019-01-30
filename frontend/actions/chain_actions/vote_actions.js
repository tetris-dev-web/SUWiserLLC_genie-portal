import * as APIUtil from '../../util/vote_api_util';

export const processVotes = vote_data => {
  return dispatch => {
    return APIUtil.vote(vote_data).then(() => {

      return dispatch;
    });
  };
};
