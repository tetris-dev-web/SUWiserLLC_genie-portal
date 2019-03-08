import { combineReducers } from 'redux';
import projects from './projects_reducer';
import capitalHistory from './capital_history_reducer';
import capitalBeingRaised from './capitalBeingRaisedReducer';
import tokenTransfers from './tokenTransfersReducer';
import dividendsHistory from './dividendsHistoryReducer';
import votes from './votesReducer';
import users from './user_reducer';

const entitiesReducer = combineReducers({
  projects,
  dividendsHistory,
  capitalHistory,
  capitalBeingRaised,
  tokenTransfers,
  votes,
  users
});

export default entitiesReducer;
