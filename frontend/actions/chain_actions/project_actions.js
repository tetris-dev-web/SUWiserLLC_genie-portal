import * as APIUtil from '../../util/project_api_util';
import * as ChainUtil from '../../util/chain_util';
import { receiveProject, receiveProjectErrors, receiveProjects } from '../project_actions';


export const fetchProjects  = (crowdsale, projectContract) => {
  return dispatch => {
    return APIUtil.fetchProjects().then(projects => {
      return ChainUtil.integrateProjectsData(crowdsale, projectContract, projects).then((projectsData) => {
        return dispatch(receiveProjects(projectsData));
      });
    });
  };
};

export const createProject = (crowdsale, projectData, account) => {
  return dispatch => {
    return APIUtil.createProject(projectData).then(project => {
      dispatch(receiveProject(project));
      return ChainUtil.pitchProject(crowdsale, projectData, account);
    });
  };
};
