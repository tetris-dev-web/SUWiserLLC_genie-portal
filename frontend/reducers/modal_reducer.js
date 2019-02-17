import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/modal_actions';
import { merge } from 'lodash';

const modalReducer = (state = [], action) => {
  // FILO, a stack state
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL: {
      const newState = merge([], state);
      newState.push(action.modal);
      return newState;
    }
    case CLOSE_MODAL: {
      const newState = merge([], state);
      newState.pop();
      return newState;
    }
    default:
      return state;
  }
};

export default modalReducer;
