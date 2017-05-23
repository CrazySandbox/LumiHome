import { LOGIN, LOGOUT, CONNECTED, DISCONNECTED } from '../actions/types';

const INITIAL = {
  isConnect: false,
  isLogin: false,
  isInitial: false,
  user: '',
  pass: '',
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case CONNECTED:
      return {
        ...state,
        isConnect: true,
      }
    case DISCONNECTED:
      return {
        ...state,
        isConnect: false,
      }
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        isInitial: true,
        user: action.payload.user,
        pass: action.payload.pass,
      }
    default:
      return state;
  }
}
