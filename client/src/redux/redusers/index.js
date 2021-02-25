import { combineReducers } from 'redux';
import user from './user';
import config from './config';
import rigs from './rigs';
import info from './info';

const rootReducer = combineReducers({
  user,
  config,
  rigs,
  info,
});

export default rootReducer;