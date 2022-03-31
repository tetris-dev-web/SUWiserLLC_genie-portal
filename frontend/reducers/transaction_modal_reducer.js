import { UPDATE_TRANSACTION_MODAL } from "../actions/ui_actions";
import { merge } from "lodash";

const transactionModalReducer = (state = { isOpen: false, title: "", message: "" }, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case UPDATE_TRANSACTION_MODAL:
      console.log(action);

      newState = merge({}, state, action.modalInfo);
      console.log("new state", newState);
      return newState;
    default:
      return state;
  }
};

export default transactionModalReducer;
