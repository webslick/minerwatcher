import { combineReducers } from 'redux';
import user from './user';
import config from './config';
import rigs from './rigs';

const rootReducer = combineReducers({
  user,
  config,
  rigs,
});

export default rootReducer;