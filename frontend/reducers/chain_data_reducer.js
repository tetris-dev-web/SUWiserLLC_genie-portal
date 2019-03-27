import { combineReducers } from 'redux';
import projectGraph from './project_graph_reducer';
import tokenGraph from './token_graph_reducer';

const chainDataReducer = combineReducers({
  projectGraph,
  tokenGraph
});

export default chainDataReducer;
