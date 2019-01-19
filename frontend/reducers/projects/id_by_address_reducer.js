import { merge } from 'lodash';

import {
  RECEIVE_PROJECTS,
  RECEIVE_PROJECT
} from '../actions/project_actions';

const idByAddressReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECTS:
      // return values(action.projects);
      return Object.keys(action.projects).reduce((idByAddress, id) => {
        const project = action.projects[id];
        if (project.address) {
          const address = project.address;
          idByAddress[address] = id;
        }
        return idByAddress;
      }, {});
    case RECEIVE_PROJECT:
      return merge({}, state, { [action.project.address]: action.project.id });
    default:
      return state;
  }
};

export default idByAddressReducer;
