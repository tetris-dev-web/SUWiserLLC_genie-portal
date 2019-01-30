import { fetchProjects, fetchProjectActivationLogs } from './project_actions';
import { fetchTokenPurchaseLogs } from './token_actions';

export const fetchVotesViewData = (crowdsale, projectContract, web3) => {
  return dispatch => {
    dispatch(fetchProjects(crowdsale, projectContract))
    dispatch(fetchTokenPurchaseLogs(crowdsale, web3))
    // dispatch(fetchProjectActivationLogs(crowdsale, web3))
  }
}
