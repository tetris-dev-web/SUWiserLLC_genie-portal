export const NOTIFY_TRANSACTION_COMPLETION = " NOTIFY_TRANSACTION_COMPLETION";
export const CLEAR_TRANSACTION_NOTIFICATION = "CLEAR_TRANSACTION_NOTIFICATION";
export const UPDATE_TRANSACTION_MODAL = "UPDATE_TRANSACTION_MODAL";

export const notifyTransactionCompletion = (notification) => {
  return {
    type: NOTIFY_TRANSACTION_COMPLETION,
    notification,
  };
};

export const clearTransactionNotification = () => {
  return {
    type: CLEAR_TRANSACTION_NOTIFICATION,
  };
};

export const updateTransactionModal = (modalInfo) => {
  console.log("bitch please");
  return {
    type: UPDATE_TRANSACTION_MODAL,
    modalInfo,
  };
};

export const setDemoType = (demoType) => {
  console.log("set Demo Type:", demoType);
  return {
    type: CLEAR_TRANSACTION_NOTIFICATION,
    demoType,
  };
};
