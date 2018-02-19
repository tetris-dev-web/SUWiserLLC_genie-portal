import { combineReducers } from 'redux';
import projects from './projects_reducer';
import users from './user_reducer';

const entitiesReducer = combineReducers({
  projects,
  users
});

export default entitiesReducer;
