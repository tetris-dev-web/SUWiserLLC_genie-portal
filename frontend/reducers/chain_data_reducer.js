import { combineReducers } from "redux";
import projectGraph from "./project_graph_reducer";
import tokenGraph from "./token_graph_reducer";
import timeAxis from "./time_axis_reducer";

const chainDataReducer = combineReducers({
  projectGraph,
  tokenGraph,
  timeAxis,
});

export default chainDataReducer;
