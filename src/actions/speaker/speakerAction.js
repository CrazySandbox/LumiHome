'use strick';

import UPNP from 'react-native-upnp';
import WifiAudio from './wifiaudio';
import {
  SEARCH_SPEAKER,
  FINISH_LOAD_SPEAKER,
  SEARCH_SPEAKER_LOADING,
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

export const searchSpeaker = (loading) => {
  if(loading) {
    return {
      type: SEARCH_SPEAKER_LOADING
    }
  } else {
    return {
      type: SEARCH_SPEAKER
    }
  }
}

export const listenUPNPSpeaker = (loading) => {
  listIP = [];
  return (dispatch) => {
    dispatch(searchUPNP(loading))
    UPNP.on((dev) => {
      let ip = dev.device.trim()
      dispatch(listenSpeaker(ip))
    })
  }
}

export const listenSpeaker = (ip) => {
  return (dispatch) => {
    WifiAudio.getStatus(ip, (json) => {
        if(listIP == "") {
          listIP.push(ip)
        }
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
