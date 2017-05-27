'use strick';

import UPNP from 'react-native-upnp';
import WifiAudio from './wifiaudio';
import {
  SEARCH_SPEAKER,
  FINISH_LOAD_SPEAKER,
  SEARCH_SPEAKER_LOADING,
  TIMER_START,
  TIMER_STOP
} from '../types';

const TIME_UPDATE = 50000
var data = [];
var timer = null;
var listIP = [];

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

export const searchUPNP = (loading) => {
  return (dispatch) => {
    UPNP.search()
    if(loading) {
      dispatch(searchSpeaker(loading))
    } else {
      dispatch(searchSpeaker())
    }
  }
}

export const listenSpeaker = (ip) => {
  return (dispatch) => {
    WifiAudio.getStatus(ip, (json) => {
      dispatch(getPlayerStatus(ip, json))
    })
  }
}

export const getPlayerStatusFinish = (json, json2, ip) => {
  json.player = json2
  if(data == "") {
    data.push(json)
  }
  var check = checkData(data, json)
  if(!check) {
    data.push(json)
  }
  if(listIP == "") {
    listIP.push(ip)
  }
  var check2 = checkData2(listIP, ip);
  if(!check2) {
    listIP.push(ip)
  }
  return {
    type: FINISH_LOAD_SPEAKER,
    payload: data,
    ip: listIP,
  }
}

export const getPlayerStatus = (ip, json) => {
  return (dispatch) => {
    WifiAudio.getPlayerStatus(ip, (json2)=>{
      dispatch(getPlayerStatusFinish(json, json2, ip))
    })
  }
}

export const listenUPNPSpeaker = (loading) => {
  data = [];
  listIP = [];
  return (dispatch) => {
    if(loading) {
      dispatch(searchUPNP(loading))
    } else {
      dispatch(searchUPNP())
    }
    UPNP.on((dev) => {
      let ip = dev.device.trim()
      dispatch(listenSpeaker(ip))
    })
  }
}

export const checkData = (array , b) => {
  let check = false
  for(var i = 0; i < array.length; i ++) {
    if(array[i].MAC == b.MAC) {
      check = true
    }
  }
  return check;
}

export const checkData2 = (array , b) => {
  let check = false
  for(var i = 0; i < array.length; i ++) {
    if(array[i] == b) {
      check = true
    }
  }
  return check;
}

export const upDateSpeaker = () => {
  var loading = false
  return (dispatch) => {
    clearInterval(timer);
    timer = setInterval(() => dispatch(listenUPNPSpeaker(loading)), TIME_UPDATE)
    dispatch({type: TIMER_START})
    dispatch(listenUPNPSpeaker(loading))
  }
}

export const clearIntervalSpeaker = () => {
  clearInterval(timer);
  return {
    type: TIMER_STOP
  }
}
