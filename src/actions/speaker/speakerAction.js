'use strick';

import UPNP from 'react-native-upnp';
import WifiAudio from './wifiaudio';
import {
  SEARCH_SPEAKER,
  FINISH_LOAD_SPEAKER,
  GET_MASTER_SLAVE,
  DEL_MASTER_SLAVE
} from '../types';

const listIP = [];

export const searchUPNP = (loading) => {
  return (dispatch) => {
    UPNP.search()
    dispatch(searchSpeaker(loading))
  }
}

export const searchSpeaker = () => {
  return {
    type: SEARCH_SPEAKER
  }
}

export const listenUPNPSpeaker = () => {
  listIP = [];
  return (dispatch) => {
    dispatch(searchUPNP())
    UPNP.on((dev) => {
      let ip = dev.device.trim()
      dispatch(listenSpeaker(ip))
    })
  }
}

export const listenSpeaker = (ip) => {
  return (dispatch) => {
    WifiAudio.getStatus(ip, (json) => {
      var check = checkData(listIP, ip);
      if(!check) {
        listIP.push(ip)
      }
      listIP.sort()
      dispatch(finish(listIP))
    })
  }
}

export const finish = (Data) => {
  console.log('finish', Data)
  return {
    type: FINISH_LOAD_SPEAKER,
    payload: Data,
  }
}

export const getMasterSlave = (ip, data) => {
  let listSlave = {};
  listSlave.ip = ip;
  listSlave.slave_list = data;
  return {
    type: GET_MASTER_SLAVE,
    payload: listSlave,
  }
}

export const delMasterSlave = () => {
  return {
    type: DEL_MASTER_SLAVE
  }
}

export const checkData = (array , b) => {
  let check = false
  for(var i = 0; i < array.length; i ++) {
    if(array[i] == b) {
      check = true
    }
  }
  return check;
}
