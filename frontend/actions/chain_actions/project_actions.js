// import * as APIUtil from '../../util/project_api_util';
import * as ChainUtil from '../../util/chain_util';
import * as ExpressAPI  from '../../util/fetch_util/express_api_util';
export const RECEIVE_PROJECT_GRAPH_DATA = 'RECEIVE_PROJECT_GRAPH_DATA';

export const receiveProjectGraphData = projectGraphData => {
  console.log(projectGraphData)
  const { projects, weiRaised } = projectGraphData;
  return {
    type: RECEIVE_PROJECT_GRAPH_DATA,
    projects,
    weiRaised
  };
};

export const fetchProject = (projectFactoryInstance, projectContract, id, address) => {
  return dispatch => {
    return ChainUtil.getProjectData(projectFactoryInstance, projectContract, id, address).then((projectData) => {
      return dispatch(receiveProject(projectData));
    });
  };
};

export const fetchSharedProjectGraphData = () => {
  console.log("yo bitch")
  return dispatch => {
    return ExpressAPI.fetchApiData('shared_project_graph_data').then(projectGraphData => {
      return dispatch(receiveProjectGraphData(projectGraphData));
    });
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
