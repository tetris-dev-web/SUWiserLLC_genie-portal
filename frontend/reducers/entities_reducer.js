import { combineReducers } from 'redux';
import projects from './projects_reducer';
import capitalHistory from './capital_history_reducer';
import capitalBeingRaised from './capitalBeingRaisedReducer';
import tokenTransfers from './tokenTransfersReducer';
import users from './user_reducer';

const entitiesReducer = combineReducers({
  projects,
  capitalHistory,
  capitalBeingRaised,
  tokenTransfers,
  users
});

export default entitiesReducer;
