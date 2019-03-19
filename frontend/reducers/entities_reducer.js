import { combineReducers } from 'redux';
import projectGraph from './project_graph_reducer';
import tokenGraph from './token_graph_reducer';

const entitiesReducer = combineReducers({
  projectGraph,
  tokenGraph
});

export default entitiesReducer;
