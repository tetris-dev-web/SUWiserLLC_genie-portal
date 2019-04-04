import {
  OPEN_MODAL,
  CLOSE_MODAL,
  // RECEIVE_PROJECT,
} from '../actions/modal_actions';
import { merge } from 'lodash';

const modalReducer = (state = [], action) => {
  // FILO, a stack state
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL: {
      const newState = {"projectAddress": action.projectId, "ProjectModalIsOpen": true}
      return newState;
    }
    case CLOSE_MODAL: {
      const newState = {"projectAddress": [], "ProjectModalIsOpen": false}
      return newState;
    }
    // case RECEIVE_PROJECT:
    //   let newState = merge({}, state, { "openProject": action.project });
    //   return newState;
    default:
      return state;
  }
};

export default modalReducer;
