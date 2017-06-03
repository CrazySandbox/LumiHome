'use strick'
import { hex2a } from './convertData';

const WifiAudio = {}

WifiAudio.getStatus=(url, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=getStatus', {method: "GET"})
  .then((response) => response.json())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.getPlayerStatus = (url, callback) =>
{
  fetch('http://' + url + '/httpapi.asp?command=getPlayerStatus', {method: "GET"})
  .then((response) => response.json())
  .then((responseData) => {
      if(responseData)
      {
        if(responseData.Album)
        {
          responseData.Album = hex2a(responseData.Album)
        }
        if(responseData.Artist)
        {
          responseData.Artist = hex2a(responseData.Artist)
        }
        if(responseData.Title)
        {
          responseData.Title = hex2a(responseData.Title)
        }
        responseData.TitleOriginal = responseData.Title
      }

      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

//action : play, pause, prev, next, stop
WifiAudio.setPlay = (url, action, callback) =>
{
  fetch('http://' + url + '/httpapi.asp?command=setPlayerCmd:' + action, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.seek = (url, position, callback) =>
{
  fetch('http://' + url + '/httpapi.asp?command=setPlayerCmd:seek:' + position, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.rename = (url, name, callback) =>
{
  fetch('http://' + url + '/httpapi.asp?command=setDeviceName:' + name, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.setVol = (url, vol, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=setPlayerCmd:vol:' + parseInt(vol), {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.mute = (url, ismute, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=setPlayerCmd:mute:' + (ismute ? 1 : 0), {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

// 0 : sequence, 1 : repeat current, 2 : random, 3 : repeate all
WifiAudio.setMode = (url, action, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=setPlayerCmd:loopmode:' + action, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.getListMusics = (url, callback) =>
{
  fetch('http://' + url + '/httpapi.asp?command=getLocalPlayList', {method: "GET"})
  .then((response) => response.json())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

// time = DDMMYYYYHHMMSS
WifiAudio.synchClock = (ip, dateTime, callback)=>
{
  fetch('http://' + ip + '/httpapi.asp?command=timeSync:' + dateTime, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.setAlarm = (url, option, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=setAlarmClock:' + option, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.getAlarm = (url, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=getAlarmClock:0', {method: "GET"})
  .then((response) => response.json())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.getSlaves = (url, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=multiroom:getSlaveList', {method: "GET"})
  .then((response) =>
    response.json()
  )
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {
         console.log('getSlaves', error);
     })
  .done();
}

WifiAudio.playLocalList = (url, idx, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=setPlayerCmd:playLocalList:' + (parseInt(idx) + 1), {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.playUrl = (url, path, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=setPlayerCmd:setPlayerCmd:play:' + path, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}


WifiAudio.joinSpeaker = (master, slave, callback)=>
{
  fetch('http://' + slave.ip + '/httpapi.asp?command=ConnectMasterAp:ssid=' + master.ssid + ':ch=n:auth=OPEN:encry=NONE:pwd=:chext=0:JoinGroupMaster:eth' + master.ip + ':wifi' + master.ip + ':uuid' + master.uuid, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.singleSpeaker = (ip, callback)=>
{
  fetch('http://' + ip + '/httpapi.asp?command=multiroom:Ungroup', {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.kickOutSpeaker = (master, ip, callback)=>
{
  fetch('http://' + master + '/httpapi.asp?command=multiroom:SlaveKickout:' + ip, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.setChannel = (url, type, channel, callback)=>
{
  let uri = ''
  if(type == 0)
  {
    uri = 'http://' + url + '/httpapi.asp?command=setPlayerCmd:slave_channel:' + channel
  }else {
    uri = 'http://' + url + '/httpapi.asp?command=multiroom:SlaveChannel:url:' + channel
  }

  fetch(uri, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}


WifiAudio.getShutdown = (url, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=getShutdown', {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.setShutdown = (url, sec, callback)=>
{
  fetch('http://' + url + '/httpapi.asp?command=setShutdown:' + sec, {method: "GET"})
  .then((response) => response.text())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.connectWifi = (ip, callback) => {
  fetch('http://' + ip + '/httpapi.asp', {method: "POST"})
  .then((response) => response.json())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

WifiAudio.setSSID = (ip, value, callback) => {
  fetch('http://' + ip + '/httpapi.asp?command=setSSID:' + value, {method: "GET"})
  .then((response) => response.json())
  .then((responseData) => {
      if(callback)
      {
        callback(responseData)
      }
  })
  .catch((error) => {

     })
  .done();
}

export default WifiAudio;
