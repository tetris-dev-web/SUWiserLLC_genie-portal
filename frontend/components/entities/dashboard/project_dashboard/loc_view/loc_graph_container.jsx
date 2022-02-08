import { connect } from 'react-redux';
import { merge } from 'lodash';
import LocGraph from './loc_graph';
import { getLocationGraphData } from '../../../../../util/location_util';
import { fetchSharedProjectGraphData, fetchProject } from '../../../../../actions/chain_actions/project_actions';

const getArrayOfObjectsMinMax = (arrayOfObjects, key) => {
  const arrayOfValues = arrayOfObjects.map(object => object[key]);
  return [Math.min(...arrayOfValues), Math.max(...arrayOfValues)];
};

const mapStateToProps = (state) => {
  const projects = Object.values(state.chain_data.projectGraph.projects).map(project => merge({}, project));
  return {
    projectFactoryInstance: state.network.projectFactoryInstance,
    projectContract: state.network.projectContract,
    projects,
    projectsLoaded: Object.keys(state.chain_data.projectGraph.projects).length,
    allProjectsValuationMinMax: getArrayOfObjectsMinMax(projects, "valuation")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProject: address => dispatch(fetchProject(address)),
    fetchSharedProjectGraphData: () => dispatch(fetchSharedProjectGraphData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocGraph);
