import { merge, values } from 'lodash';

import {
  RECEIVE_PROJECTS,
  RECEIVE_PROJECT
} from '../actions/project_actions';

const dataReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECTS:
      // return values(action.projects);
      return (action.projects);
    case RECEIVE_PROJECT:
      return merge({}, state, { [action.project.id]: action.project });
    default:
      return state;
  }
};

export default dataReducer;
