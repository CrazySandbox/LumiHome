import { Alert } from 'react-native';
import {
  LOGINSUCCESS,
  LOGINFAIL,
  CONNECTED,
  DISCONNECTED,
  LOGOUT,
  GOHOME,
  RESETFACTORY,
  GO_LISTHOME
} from '../types';
import SocketClient from '../../config/socket/socket-client';
import langs from '../../config/langs';
import { Actions } from 'react-native-router-flux';
import { setUser, setPass, setAutoLogin, restFactory, setLastHome } from '../';

const PLACE = 'login/loginForm.js';

export const LoginAction = (DataLogin) => {
  var {
    user,
    pass
  } = DataLogin;

  // Error lost connectServer
  if(!SocketClient.getInstance().isConnect()) {
    Alert.alert(
      null,
      langs.errorConnectToSever,
      [
        {text: 'OK'}
      ]
    );
    return {
      type: DISCONNECTED,
    }
  }

  // Error username = ""
  if(user.trim() == "") {
    Alert.alert(
      null,
      langs.errorUser,
      [
        {text: 'OK'}
      ]
    );
    return {
      type: LOGINFAIL
    }
  }

  // Error username is not space
  if(user.length !== user.trim().length) {
    Alert.alert(
      null,
      langs.errorUserSpace,
      [
        {text: 'OK'}
      ]
    );
    return {
      type: LOGINFAIL
    }
  }

  // Error password = ""
  if(pass.trim() == "") {
    Alert.alert(
      null,
      langs.errorPass,
      [
        {text: 'OK'}
      ]
    );
    return {
      type: LOGINFAIL
    }
  }

  return (dispatch) => {
    SocketClient.getInstance().sendCommandStringInPlace(PLACE,'$mau=login',{"acc":user.trim(),"pass":pass}, (json) => {
      if(json.err) {
        dispatch(loginFail())
      }

      if(json.ret == '0') {
        setUser(user);
        setPass(pass);
        setAutoLogin("1");
        SocketClient.getInstance().sendCommandStringInPlace(PLACE,'$mhome=lst',null,(json) => {
          if(json.err) return;
          dispatch(loginSuccess(DataLogin, json))
          Actions.menuhome({type: 'reset'});
        });
      } else {
        Alert.alert(
          null,
          langs.errorLogin,
          [
            {text: 'OK'}
          ]
        );
        dispatch(loginFail())
      }
    });
  }
}

export const loginFail = () => {
  return {
    type: LOGINFAIL
  }
}

export const loginSuccess = (data, json) => {
  return {
    type: LOGINSUCCESS,
    payload: data,
    listhome: json
  }
}

export const logOut = () => {
  Actions.login({type: 'reset'});
  setAutoLogin("0");
  return {
    type: LOGOUT
  }
}

export const resetFac = () => {
  return {
    type: RESETFACTORY
  }
}

export const ResetFactory = () => {
  return (dispatch) => {
    restFactory();
    dispatch(resetFac());
    Actions.login({type: 'reset'});
  }
}

export const goHome = (mac, item) => {
  setLastHome(mac)
  let check = checkHome(item, mac)
  let home = item[check]
  Actions.tabbar({type: 'reset'})
  return {
    type: GOHOME,
    mac: mac,
    home: home
  }
}

export const goListHome = () => {
  setLastHome("0")
  Actions.menuhome({type: 'reset'})
  return {
    type: GO_LISTHOME
  }
}

export const checkHome = (DATA, a) => {
  for(var i = 0; i< DATA.length; i++) {
    if(DATA[i].mac == a) {
      return i
    }
  }
}
