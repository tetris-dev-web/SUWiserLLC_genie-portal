import { combineReducers } from 'redux';

import network from './network_reducer';
import chain_data from './chain_data_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';

const rootReducer = combineReducers({
  network,
  chain_data,
  session,
  errors,
  ui
});

export default rootReducer;
