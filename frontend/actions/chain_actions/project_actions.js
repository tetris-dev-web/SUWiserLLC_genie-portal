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

export const fetchProjectActivationLogs = (crowdsale, web3) => {
  return dispatch => {
    return ChainUtil.fetchProjectActivationLogs(crowdsale, web3)
  }
}


export const createProject = (crowdsale, railsParams, params, pdf_file, account) => {
  // return dispatch => {
    // return APIUtil.createProject(railsParams).then(project => {
    //   // return APIUtil.uploadPDF(project, pdf_file).then(()=>{
    //     dispatch(receiveProject(project));
        return ChainUtil.pitchProject(crowdsale, params, account);
      // })
    // });
};
