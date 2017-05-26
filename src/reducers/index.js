import { combineReducers } from 'redux';
import routers from './routers';
import authen from './authen';

export default combineReducers({
  routers,
  authen,
});
