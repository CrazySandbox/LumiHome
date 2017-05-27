import { combineReducers } from 'redux';
import routers from './routers';
import authen from './authen';
import wifiaudio from './wifiaudio';

export default combineReducers({
  routers,
  authen,
  wifiaudio
});
