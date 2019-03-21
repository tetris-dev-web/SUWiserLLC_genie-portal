import { connect } from 'react-redux';
import { merge } from 'lodash';
import LocGraph from './loc_graph';
import { getLocationGraphData } from '../../../../../util/location_util';

const getArrayOfObjectsMinMax = (arrayOfObjects, key) => {
  const arrayOfValues = arrayOfObjects.map(object => object[key]);
  return [Math.min(...arrayOfValues), Math.max(...arrayOfValues)];
};

const mapStateToProps = ({ entities }) => {

  const projects = Object.values(entities.projects).map(project => merge({}, project));

  return {
    projects,
    allProjectsValuationMinMax: getArrayOfObjectsMinMax(projects, "valuation")
  };
};

export default connect(mapStateToProps)(LocGraph);
