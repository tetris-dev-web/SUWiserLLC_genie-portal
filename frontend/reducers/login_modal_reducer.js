import {
  CLOSE_LOGIN_MODAL,
  OPEN_LOGIN_MODAL
} from '../actions/modal_actions';
import { merge } from 'lodash';

const loginModalReducer = (state = true, action) => {
  // FILO, a stack state
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL: {
      return true;
    }
    case CLOSE_MODAL: {
      return false
    }
    default:
      return state;
  }
};

export default loginModalReducer;
