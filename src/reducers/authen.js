import {
  LOGINSUCCESS,
  LOGOUT,
  LOGINFAIL,
  CONNECTED,
  DISCONNECTED,
  GETLANGUAGE,
  GETTHEME,
  GETAUTOLOGIN,
  GETLASTHOME,
  GETUSER,
  GETPASS,
  LOADFINISHDATA,
  RESETFACTORY,
  GOHOME,
  BACK_LOGIN
} from '../actions/types';

const INITIAL = {
  internet: false,
  connectServer: false,
  connectLocal: false,
  isConnect: false,
  authen: false,
  autoLogin: "0",
  lasthome: "0",
  initInstall: 1,
  language: "vn",
  theme: "darktheme",
  user: '',
  pass: '',
  loadingData: true,
  keyAuthen: '',
  listhome: {},
  checklogin: true,
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case CONNECTED:
      return {
        ...state,
        isConnect: true,
        connectServer: true,
        checklogin: true,
      }
    case DISCONNECTED:
      return {
        ...state,
        isConnect: false,
        connectServer: false,
        checklogin: true,
      }
    case LOGINSUCCESS:
      return {
        ...state,
        authen: true,
        isConnect: true,
        connectServer: true,
        internet: true,
        autoLogin: "1",
        user: action.payload.user,
        pass: action.payload.pass,
        listhome: action.listhome.home,
        keyAuthen: action.listhome.cmdkey,
        checklogin: true,
      }
      case LOGINFAIL:
        return {
          ...state,
          authen: false,
          isConnect: false,
          connectServer: false,
          checklogin: true,
        }
      case BACK_LOGIN:
        return {
          ...state,
          checklogin: false,
        }
      case GETLANGUAGE:
        return {
          ...state,
          language: action.payload
        }
      case GETTHEME:
        return {
          ...state,
          theme: action.payload
        }
      case GETAUTOLOGIN:
        return {
          ...state,
          autoLogin: action.payload
        }
      case GETLASTHOME:
        return {
          ...state,
          lasthome: action.payload
        }
      case GETUSER:
        return {
          ...state,
          user: action.payload
        }
      case GETPASS:
        return {
          ...state,
          pass: action.payload
        }
      case LOADFINISHDATA:
        return {
          ...state,
          loadingData: false,
        }
      case LOGOUT:
        return {
          ...state,
          authen: false,
          isConnect: false,
          connectServer: false,
          autoLogin: "0",
        }
      case RESETFACTORY:
        return {
          internet: false,
          connectServer: false,
          connectLocal: false,
          isConnect: false,
          authen: false,
          autoLogin: "0",
          lasthome: "0",
          initInstall: 1,
          language: "vn",
          theme: "darktheme",
          user: '',
          pass: '',
          loadingData: true,
          keyAuthen: '',
          listhome: {},
          checklogin: true,
        }
      case GOHOME:
        return {
          ...state,
          autoLogin: "1",
          lasthome: action.payload
        }
    default:
      return state;
  }
}
