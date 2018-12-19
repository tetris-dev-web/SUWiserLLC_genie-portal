import * as APIUtil from '../../util/project_api_util';
import * as ChainUtil from '../../util/chain_util';
import { receiveProjects } from '../project_actions';


export const fetchChainProjects  = (crowdsale) => {
  return dispatch => {
    return APIUtil.fetchProjects().then(projects => {
      return ChainUtil.integrateProjectsData(crowdsale, projects);
    }).then((projectsData) => {
      return dispatch(receiveProjects(projectsData));
    });
  };
};
