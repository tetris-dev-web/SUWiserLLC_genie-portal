// export const fetchCrowdsaleLogs = (crowdsale, web3) => {
//   return dispatch => {
//     return ChainUtil.fetchProjectActivationLogs(crowdsale, web3)
//   }
// }
import * as ChainUtil from '../../util/chain_util';
import { fetchProjects } from './project_actions';
export const RECEIVE_WEI_RAISED = 'RECEIVE_WEI_RAISED';

export const fetchProjectsAndCapitalRaised = (projectFactoryInst, projectContract, crowdsaleInstance) => {
  return dispatch => {
    return dispatch(fetchProjects(projectFactoryInst, projectContract)).then(() => {
      return dispatch(fetchWeiRaised(crowdsaleInstance));
    });
  };
};

export const fetchWeiRaised = (crowdsaleInstance) => {
  console.log("fetch wei raised action")
  return dispatch => {
    return ChainUtil.fetchWeiRaised(crowdsaleInstance).then(weiRaised => {
      console.log("weiRaised fetched:", weiRaised)
      return dispatch({type: RECEIVE_WEI_RAISED, weiRaised});
    });
  };
};
