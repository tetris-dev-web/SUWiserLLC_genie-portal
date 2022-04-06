import { combineReducers } from "redux";
import projects from "./projects_reducer";
import capitalBeingRaised from "./capitalBeingRaisedReducer";
import capitalHistory from "./capital_history_reducer";
import votes from "./votesReducer";

const projectGraphReducer = combineReducers({
  projects,
  capitalBeingRaised,
  capitalHistory,
  votes,
});

export default projectGraphReducer;
