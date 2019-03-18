import { combineReducers } from 'redux';
import projects from './projects_reducer';
import capitalHistory from './capital_history_reducer';
import capitalBeingRaised from './capitalBeingRaisedReducer';
import tokenTransfers from './tokenTransfersReducer';
import dividendsHistory from './dividendsHistoryReducer';
import votes from './votesReducer';

const chainDataReducer = combineReducers({
  projects,
  dividendsHistory,
  capitalHistory,
  capitalBeingRaised,
  tokenTransfers,
  votes
});

export default chainDataReducer;
