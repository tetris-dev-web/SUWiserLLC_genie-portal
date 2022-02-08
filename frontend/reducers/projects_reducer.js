import { merge, values } from 'lodash';

import {
  RECEIVE_PROJECT_GRAPH_DATA,
  RECEIVE_PROJECT
} from '../actions/chain_actions/project_actions';

const projectsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECT_GRAPH_DATA:
      return (action.projects);

    default:
      return state;
  }
};

export default projectsReducer;
