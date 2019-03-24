
import {
  RECEIVE_PROJECT_ERRORS,
  CLEAR_PROJECT_ERRORS
} from '../actions/project_actions';

const _nullErrors = [];

const projectErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECT_ERRORS:
      // returned [] because action.errors was returning undefined
      return action.errors || [];
    case CLEAR_PROJECT_ERRORS:
      return [];
    default:
      return state;
  }
};

export default projectErrorsReducer;
