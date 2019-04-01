import {
  NOTIFY_TRANSACTION_COMPLETION,
  CLEAR_TRANSACTION_NOTIFICATION
} from '../actions/ui_actions';
import { merge } from 'lodash';

const transactionNotificationReducer = (state = '', action) => {
  Object.freeze(state);
  switch (action.type) {
    case NOTIFY_TRANSACTION_COMPLETION:
      return action.notification;
    case CLEAR_TRANSACTION_NOTIFICATION:
    return '';
    default:
      return state;
  }
};

export default transactionNotificationReducer;
