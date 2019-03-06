import * as ChainUtil from '../../util/chain_util';

export const RECEIVE_FREE_VOTES = "RECEIVE_FREE_VOTES";
export const RECEIVE_PROJECT_VOTES = "RECEIVE_PROJECT_VOTES";

export const fetchFreeVotes = (account, votingToken) => {
  return dispatch => {
    return ChainUtil.fetchFreeVotes(account, votingToken).then(votes => {
      return dispatch(receiveFreeVotes(votes));
    })
  };
};

export const fetchProjectVotes = (account, projectContract, projectAddress) => {
  return dispatch => {
    return ChainUtil.fetchProjectVotes(account, projectContract, projectAddress).then(votes => {
      return dispatch(receiveProjectVotes(votes, projectAddress));
    })
  };
};

export const receiveFreeVotes = votes => {
  return {
    type: RECEIVE_FREE_VOTES,
    votes
  }
}

export const receiveProjectVotes = (votes, projectAddr) => {
  return {
    type: RECEIVE_PROJECT_VOTES,
    votes,
    projectAddr
  }
}
