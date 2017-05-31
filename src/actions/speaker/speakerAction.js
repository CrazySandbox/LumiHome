'use strick';

import UPNP from 'react-native-upnp';
import WifiAudio from './wifiaudio';
import {
  SEARCH_SPEAKER,
  FINISH_LOAD_SPEAKER,
  SEARCH_SPEAKER_LOADING,
  TIMER_START,
  TIMER_STOP,
  FINSH_GET_SPEAKER,
  UPDATE_SPEAKER
} from '../types';

const TIME_UPDATE = 2000;
const listSpeaker = [];
var timer = null;

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
  return (dispatch) => {
    dispatch(searchUPNP(loading))
    UPNP.on((dev) => {
      let ip = dev.device.trim()
      dispatch(listenSpeaker(ip))
    })
  }
}

export const listenSpeaker = (ip) => {
  listSpeaker = [];
  return (dispatch) => {
    WifiAudio.getStatus(ip, (json) => {
      var o = {};
      if(json.MAC) {
        if(listSpeaker == "") {
          o.ip = ip
          o.device = json
          listSpeaker.push(o)
        }
        var check2 = checkData2(listSpeaker, ip);
        if(!check2) {
          o.ip = ip;
          o.device = json
          listSpeaker.push(o)
        }
        dispatch(getPlayerStatus(listSpeaker))
      }
    })
  }
}

export const getPlayerStatus = (listSpeaker) => {
  return (dispatch) => {
    for(var i = 0; i< listSpeaker.length; i++) {
      WifiAudio.getPlayerStatus(listSpeaker[i].ip, (json)=>{
        dispatch(getPlayerStatusFinish(json, listSpeaker, i))
      })
  }}
}

export const getPlayerStatusFinish = (json, listSpeaker, i) => {
  return (dispatch) => {
    listSpeaker[i-1].player = json
    dispatch(finish(listSpeaker))
  }
}

export const finish = (Data) => {
  return {
    type: FINISH_LOAD_SPEAKER,
    payload: Data,
  }
}

export const upDateSpeaker = (ip, speaker) => {
  var loading = false
  return (dispatch) => {
    clearInterval(timer);
    timer = setInterval(() => dispatch(updatePlayerStatus(ip, speaker)), TIME_UPDATE)
      //dispatch({type: TIMER_START})
      dispatch(updatePlayerStatus(ip, speaker))
  }
}

export const updatePlayerStatus = (ip, speaker) => {
  return (dispatch) => {
    WifiAudio.getPlayerStatus(ip, (json) => {
      dispatch(updatePlayerStatusFinish(ip, json, speaker))
    })
  }
}

export const updatePlayerStatusFinish = (ip, json, speaker) => {
  console.log('ip = ', ip)
  for(var i=0; i<speaker.length; i++) {
    if(speaker[i].ip == ip) {
      speaker[i].player = json
      console.log('finish', speaker[i].player)
      return {
        type: UPDATE_SPEAKER,
        payload: speaker,
      }
    }
  }
}

export const clearIntervalSpeaker = () => {
  clearInterval(timer);
  timer = null;
  return {
    type: TIMER_STOP
  }
}

export const checkData = (array , b) => {
  let check = false
  for(var i = 0; i < array.length; i ++) {
    if(array[i].device.MAC == b.MAC) {
      check = true
    }
  }
  return check;
}

export const checkData2 = (array , b) => {
  let check = false
  for(var i = 0; i < array.length; i ++) {
    if(array[i].ip == b) {
      check = true
    }
  }
  return check;
}
