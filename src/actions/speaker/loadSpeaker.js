'use strick';

import UPNP from 'react-native-upnp';
import WifiAudio from './wifiaudio';
import {
  SEARCH_SPEAKER,
  FINISH_LOAD_SPEAKER,
  SEARCH_SPEAKER_LOADING
} from '../types';

const TIME_UPDATE = 5000
var data = [];
var timer = null;

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

export const getPlayerStatusFinish = (json, json2) => {
  json.player = json2
  if(data == "") {
    data.push(json)
  }
  var check = checkData(data, json)
  if(!check) {
    data.push(json)
  }
  return {
    type: FINISH_LOAD_SPEAKER,
    payload: data
  }
}

export const getPlayerStatus = (ip, json) => {
  return (dispatch) => {
    WifiAudio.getPlayerStatus(ip, (json2)=>{
      dispatch(getPlayerStatusFinish(json, json2))
    })
  }
}

export const listenUPNPSpeaker = (loading) => {
  data = [];
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

export const upDateSpeaker = () => {
  var loading = false
  return (dispatch) => {
    clearInterval(timer);
    timer = setInterval(() => dispatch(listenUPNPSpeaker(loading)), TIME_UPDATE)
  }
}
