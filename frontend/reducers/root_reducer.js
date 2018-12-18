import { combineReducers } from 'redux';

import network from './network_reducer';
import entities from './entities_reducer';
import session from './session_reducer';
import errors from './errors_reducer';

const rootReducer = combineReducers({
  network,
  entities,
  session,
  errors
});

export default rootReducer;
