import {
  combineReducers
} from 'redux';
import modals from './modal_reducer';
// import loginModal from './login_modal_reducer';

const uiReducer = combineReducers({
  modals
});

export default uiReducer;
