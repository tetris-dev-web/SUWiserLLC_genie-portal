// import * as APIUtil from '../../util/project_api_util';
import * as ChainUtil from '../../util/chain_util';
import * as ExpressAPI  from '../../util/fetch_util/express_api_util';
export const RECEIVE_PROJECT_GRAPH_DATA = 'RECEIVE_PROJECT_GRAPH_DATA';


export const receiveProjectGraphData = projectGraphData => {
  // console.log(projectGraphData)
  const { projects, weiRaised } = projectGraphData;
  return {
    type: RECEIVE_PROJECT_GRAPH_DATA, //change to metadata
    projects,
    weiRaised
  };
};

export const fetchSharedProjectGraphData = () => {
  return dispatch => {
    return ExpressAPI.fetchApiData('shared_project_graph_data').then(projectGraphData => {
      return dispatch(receiveProjectGraphData(projectGraphData));
    });
  };
};





export const pitchProjectForDemo = params => {
  return ExpressAPI.fetchApiData(
    'demo/pitch_project',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({params})
    }
  )
}

export const createProject = (projectFactoryInstance, params, pdf_file, account) => {
    return ChainUtil.pitchProject(projectFactoryInstance, params, account);
};
