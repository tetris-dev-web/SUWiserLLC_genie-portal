// import merge from 'lodash/merge';
// import values from 'lodash/values';
import { merge, values } from 'lodash';
import {
  RECEIVE_PROJECTS,
  RECEIVE_PROJECT
} from '../actions/project_actions';

const projectsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECTS:
    debugger
      return values(action.projects);
    case RECEIVE_PROJECT:
      return merge({}, state, { [action.project.id]: action.project });
    default:
      return state;
  }
};

export default projectsReducer;
