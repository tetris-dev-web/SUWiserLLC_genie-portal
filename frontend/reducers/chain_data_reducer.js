import { combineReducers } from "redux";
import projectGraph from "./chain_data/project_graph_reducer";
import tokenGraph from "./chain_data/token_graph_reducer";
import timeAxis from "./chain_data/time_axis_reducer";

const chainDataReducer = combineReducers({
  projectGraph,
  tokenGraph,
  timeAxis,
});

export default chainDataReducer;
