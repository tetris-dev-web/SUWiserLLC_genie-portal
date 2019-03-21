// import * as APIUtil from '../../util/project_api_util';
import * as ChainUtil from '../../util/chain_util';
import * as ExpressAPI  from '../../util/fetch_util/express_api_util';
export const RECEIVE_PROJECT_GRAPH_DATA = 'RECEIVE_PROJECT_GRAPH_DATA';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';

export const receiveProjectGraphData = projectGraphData => {
  console.log(projectGraphData)
  const { projects, weiRaised } = projectGraphData;
  return {
    type: RECEIVE_PROJECT_GRAPH_DATA,
    projects,
    weiRaised
  };
};

export const fetchProject = (address) => {
  return dispatch => {
    return ExpressAPI.fetchApiData(`project_graph_data/${address}`).then(project => {
      return dispatch(receiveProject(project));
    })
  }
};

export const fetchSharedProjectGraphData = () => {
  return dispatch => {
    return ExpressAPI.fetchApiData('shared_project_graph_data').then(projectGraphData => {
      return dispatch(receiveProjectGraphData(projectGraphData));
    });
  };
};

export const fetchProjectModuleData = address => {
  return dispatch => {
    return ExpressAPI.fetchApiData(`project_module_data/${address}`).then(projectModuleData => {
      return dispatch(receiveProject(projectModuleData));
    })
  }
}

export const createProject = (projectFactoryInstance, params, pdf_file, account) => {
    return ChainUtil.pitchProject(projectFactoryInstance, params, account);
};

export const receiveProject = project => {
  return {
    type: RECEIVE_PROJECT,
    project
  };
};
