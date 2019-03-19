import { connect } from 'react-redux';
import { merge } from 'lodash';
import LocGraph from './loc_graph';
import { getLocationGraphData } from '../../../../../util/location_util';
import { fetchSharedProjectGraphData } from '../../../../../actions/chain_actions/project_actions';

const getArrayOfObjectsMinMax = (arrayOfObjects, key) => {
  const arrayOfValues = arrayOfObjects.map(object => object[key]);
  return [Math.min(...arrayOfValues), Math.max(...arrayOfValues)];
};

const mapStateToProps = ({ entities }) => {
  console.log("E", entities)
  const projects = Object.values(entities.projectGraph.projects).map(project => merge({}, project));

  return {
    projects,
    projectsLoaded: Object.keys(entities.projectGraph.projects).length,
    allProjectsValuationMinMax: getArrayOfObjectsMinMax(projects, "valuation")
  };
};

const mapDispatchToProps = dispatch => {
  return {
      fetchSharedProjectGraphData: () => dispatch(fetchSharedProjectGraphData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocGraph);
