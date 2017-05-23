import { combineReducers } from 'redux';
import routers from './routers';
import authen from './authen';
import initial from './initial';

export default combineReducers({
  routers,
  initial,
  authen,
});
