import { RECEIVE_WEI_RAISED } from '../actions/chain_actions/crowdsale_actions';


const capitalBeingRaisedReducer = (state = 0, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_WEI_RAISED:
    console.log("RECEIVE WEI RAISED", action)
      return action.weiRaised;
    default:
      return state;
  }
};

export default capitalBeingRaisedReducer;
