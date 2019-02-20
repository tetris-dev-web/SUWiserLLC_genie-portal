import {
  combineReducers
} from 'redux';
import modals from './modal_reducer';

const uiReducer = combineReducers({
  modals
});

export default uiReducer;