import { Alert } from 'react-native';
import { LOGIN, CHANGEDATA, SAVEDATA, CONNECTED, DISCONNECTED } from './types';
import SocketClient from '../config/socket/socket-client';
import langs from '../config/langs';

export const CheckConnect = () => {
  if(!SocketClient.getInstance().isConnect()) {
    console.log("connected")
    return {
      type: CONNECTED,
    }
  } else {
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
}

export const LoginAction = () => {
  return {
    type: LOGIN,
    payload: 'dulieu'
  }
}

export const ChangeData = () => {
  return {
    type: CHANGEDATA,
    payload: 'data thay doi'
  }
}

export const SaveData = () => {
  return {
    type: SAVEDATA,
    payload: '',
  }
}
