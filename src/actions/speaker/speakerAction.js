'use strick';

import UPNP from 'react-native-upnp';
import WifiAudio from './wifiaudio';
import {
  SEARCH_SPEAKER,
  FINISH_LOAD_SPEAKER,
  SEARCH_SPEAKER_LOADING,
  TIMER_START,
  TIMER_STOP,
  FINSH_GET_SPEAKER
} from '../types';

const TIME_UPDATE = 200000;
const listIP = [];
const Data = [];
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
  listIP = [];
  Data = [];
  return (dispatch) => {
    dispatch(searchUPNP(loading))
    UPNP.on((dev) => {
      let ip = dev.device.trim()
      dispatch(listenSpeaker(ip))
    })
  }
}

export const listenSpeaker = (ip) => {
  listIP = [];
  Data = [];
  return (dispatch) => {
    WifiAudio.getStatus(ip, (json) => {
      if(json.MAC) {
        if(listIP == "") {
          listIP.push(ip)
        }
        var check2 = checkData2(listIP, ip);
        if(!check2) {
          listIP.push(ip)
        }
        listIP.sort()

        if(Data == "") {
          Data.push(json);
        }
        var check = checkData(Data, json)
        if(!check) {
          Data.push(json)
        }
        //console.log('listIP', listIP)
        dispatch(finishGetSpeaker(listIP))
        dispatch(getPlayerStatus(listIP, Data))
      }
    })
  }
}

export const finishGetSpeaker = (listIP) => {
  //console.log('listIP', listIP)
  return {
    type: FINSH_GET_SPEAKER,
    payload: listIP,
  }
}

export const getPlayerStatus = (listIP, Data) => {
  return (dispatch) => {
    for(var i = 0; i< listIP.length; i++) {
      WifiAudio.getPlayerStatus(listIP[i], (json)=>{
        dispatch(getPlayerStatusFinish(json, Data, i))
      })
  }}
}

export const finish = (Data) => {
  return {
    type: FINISH_LOAD_SPEAKER,
    payload: Data,
  }
}

export const getPlayerStatusFinish = (json, Data, i) => {
  return (dispatch) => {
    Data[i-1].player = json
    dispatch(finish(Data))
  }
}

export const upDateSpeaker = () => {
  var loading = false
  return (dispatch) => {
    clearInterval(timer);
    timer = setInterval(() => dispatch(listenUPNPSpeaker(loading)), TIME_UPDATE)
    //dispatch({type: TIMER_START})
    dispatch(listenUPNPSpeaker(loading))
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
