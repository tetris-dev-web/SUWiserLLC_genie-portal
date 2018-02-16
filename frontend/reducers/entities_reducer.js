import { combineReducers } from 'redux';
import projects from './projects_reducer';

const entitiesReducer = combineReducers({
  projects,
});

export default entitiesReducer;
