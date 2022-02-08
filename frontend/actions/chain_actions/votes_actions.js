import * as ChainUtil from '../../util/chain_util';
import * as ExpressAPI  from '../../util/fetch_util/express_api_util';

export const RECEIVE_FREE_VOTES = "RECEIVE_FREE_VOTES";
export const RECEIVE_PROJECT_VOTES = "RECEIVE_PROJECT_VOTES";

export const voteForProject = (account, votes, votingInstance, projectAddress) => {
  return ChainUtil.voteForProject(account, votes, votingInstance, projectAddress);
}

export const voteAgainstProject = (account, votes, votingInstance, projectAddress) => {
  return ChainUtil.voteAgainstProject(account, votes, votingInstance, projectAddress);
}

export const voteAndUpdateProjects = (
  account,
  votes,
  type,
  votingInstance,
  projectAddress,
  projects,
  projectLeaderTracker,
  activation,
  web3
) => {
  return ChainUtil.voteAndUpdateProjects(
    account,
    votes,
    type,
    votingInstance,
    projectAddress,
    projects,
    projectLeaderTracker,
    activation,
    web3
  );
}

export const demoInvestorVoteAndUpdateProjects = (votes, type, selectedProject) => {
  return ExpressAPI.fetchApiData(
    'demo/vote_and_update_projects',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        votes,
        type,
        selectedProject
      })
    }
  )
}

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

export const fetchDemoInvestorFreeVotes = () => {
  return dispatch => {
    return ExpressAPI.fetchApiData('demo/demoInvestorFreeVotes').then((votes => {
      return dispatch(receiveFreeVotes(votes));
    }))
  }

}

export const fetchDemoInvestorProjectVotes = projectAddress => {
  return dispatch => {
    return ExpressAPI.fetchApiData(`demo/project_votes/${projectAddress}`).then((votes => {
      return dispatch(receiveProjectVotes(votes, projectAddress));
    }))
  }
}

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
