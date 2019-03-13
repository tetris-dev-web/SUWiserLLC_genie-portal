// import * as APIUtil from '../../util/project_api_util';
import * as ChainUtil from '../../util/chain_util';
import { receiveProject, receiveProjectErrors, receiveProjects } from '../project_actions';

export const fetchProject = (projectFactoryInstance, projectContract, id, address) => {
  return dispatch => {
    return ChainUtil.getProjectData(projectFactoryInstance, projectContract, id, address).then((projectData) => {
      return dispatch(receiveProject(projectData));
    });
  };
};

export const fetchProjects  = (projectFactoryInstance, projectContract) => {
  return dispatch => {
    // return APIUtil.fetchProjects().then(projects => {
      return ChainUtil.integrateProjectsData(projectFactoryInstance, projectContract).then((projectsData) => {
        return dispatch(receiveProjects(projectsData));
      });
    // });
  };
};

export const fetchProjecteCashflow = (projectContract, projectAddress, cashFlowLen) => {
  return dispatch => {
    return ChainUtil.fetchProjecteCashflow(projectContract, projectAddress, cashFlowLen, receiveProject, dispatch);
  }
}

export const fetchProjectActivationLogs = (crowdsale, web3) => {
  return dispatch => {
    return ChainUtil.fetchProjectActivationLogs(crowdsale, web3);
  };
};


export const createProject = (projectFactoryInstance, params, pdf_file, account) => {
  // return dispatch => {
    // return APIUtil.createProject(railsParams).then(project => {
    //   // return APIUtil.uploadPDF(project, pdf_file).then(()=>{
    //     dispatch(receiveProject(project));
        return ChainUtil.pitchProject(projectFactoryInstance, params, account);
      // })
    // });
};
