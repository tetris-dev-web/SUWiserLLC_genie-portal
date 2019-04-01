import {
  combineReducers
} from 'redux';
import modals from './modal_reducer';
import transactionNotification from './transaction_notification_reducer';
import transactionModal from './transaction_modal_reducer';
// import loginModal from './login_modal_reducer';

const uiReducer = combineReducers({
  modals,
  transactionNotification,
  transactionModal
});

export default uiReducer;
