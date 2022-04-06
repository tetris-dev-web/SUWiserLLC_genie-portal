import { combineReducers } from "redux";
import modals from "./ui/modal_reducer";
import transactionNotification from "./ui/transaction_notification_reducer";
import transactionModal from "./ui/transaction_modal_reducer";
// import loginModal from './login_modal_reducer';

const uiReducer = combineReducers({
  modals,
  transactionNotification,
  transactionModal,
});

export default uiReducer;
