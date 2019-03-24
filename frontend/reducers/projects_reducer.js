import { merge, values } from 'lodash';

import {
  RECEIVE_PROJECT_GRAPH_DATA,
  RECEIVE_PROJECT
} from '../actions/chain_actions/project_actions';

const projectsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECT_GRAPH_DATA:
      // return values(action.projects);
      return (action.projects);
    case RECEIVE_PROJECT:
      // let newState = merge({}, newState);
      // let oldProject = newState[action.project.id];
      // let updatedProject = merge({}, oldProject, action.project);
      // newState[action.project.id] = updatedProject;
      console.log("action", action)
      let newState = merge({}, state, { [action.project.id]: action.project });
      console.log("newState", newState)
      return newState;
    default:
      return state;
  }
};

export default projectsReducer;
