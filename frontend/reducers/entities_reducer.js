import { combineReducers } from 'redux';
import projects from './projects_reducer';
import capitalHistory from './capital_history_reducer';
import users from './user_reducer';

const entitiesReducer = combineReducers({
  projects,
  capitalHistory,
  users
});

export default entitiesReducer;
