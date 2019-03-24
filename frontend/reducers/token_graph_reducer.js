import byAll from './token_graph_by_all_reducer';
import byUser from './token_graph_by_user_reducer';
import { combineReducers } from 'redux';

const tokenGraphData =  combineReducers({
  byAll,
  byUser
})

export default tokenGraphData;
