'use strict';

import {
  Alert
} from 'react-native';


export const COMMANDER_ID =
{
  LOGIN: 0
};
const COMMANDER_KEY =
[
  "$m=login",
  "$mfloor=lst"
];

const LIFE_TIME = 50000;

const CMD_DEVICE_CHANGE_STATUS = "$mdev=stt";

const DEBUG = true;
//import {isCheatIp, IsIpVn} from './config'

if (!Array.prototype.remove) {
  Array.prototype.remove = function(val) {
      return val>-1 ? this.splice(val, 1) : [];
  };

}
if (!Array.prototype.removeObject) {
  Array.prototype.removeObject = function(value) {
    var val = -1;
    for (var i = 0; i < this.length; i++) {
      if(this[i] == value)
      {
        val = i;
        break;
      }
    }
    return val>-1 ? this.splice(val, 1) : [];
  };

}
if(!Array.prototype.clear){
  Array.prototype.clear = function() {
    while (this.length) {
      this.pop();
    }
  };
}

if (!Array.prototype.contain) {
  Array.prototype.contain = function(value){
    for (var i = 0; i < this.length; i++) {
      if(this[i] == value)
      {
        return true;
      }
    }
    return false;
  }
}
// if (!Array.prototype.indexOf) {
//   Array.prototype.indexOf = function(value){
//     for (var i = 0; i < this.length; i++) {
//       if(this[i] == value)
//       {
//         return i;
//       }
//     }
//     return -1;
//   }
// }


function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}

var socket_client = null;
class SocketClient {

	constructor() {
    this.count = 0;
    this.callbacksDevicesChangedStatusAUTO = [];
    this.callbacksAUTO = {};
    this.callbacks = [];
		this.isConnected = false;
		this.commandBuffer = '';
    this.onConnected = null;
    this.firstConnect = true;
    this.mapCallbacks = {};
    this.intervalConnect = null
	}
  reconnect()
  {
    if(this.socket)
      this.socket.destroy()
  }

  clearListener()
  {
    for (var i = 0; i < this.callbacks.length; i++) {
        clearTimeout(this.callbacks[i].timer);
    }
    this.callbacks = [];
    this.commandBuffer = '';
    this.count = 0;
    this.callbacksDevicesChangedStatusAUTO = [];
    this.callbacksAUTO = {}
  }

	connect() {
    	var net = require('react-native-tcp')
      this.socket = net.createConnection(1221, "13.126.14.105");
    	// this.socket = net.createConnection(1221, "35.154.231.180"); SV an do
      // this.socket = net.createConnection(1221, "125.212.226.68"); SV VN
    	this.socket.on("connect", () => {
        	if(!this.isConnected) {
  	     		this.isConnected = true;
          		if(this.onConnected != null) {
            		this.onConnected(true);
          		}
        	}
  	     	this.isConnected = true;
         	this.socket.setEncoding("UTF8");
          if(this.intervalConnect)
          {
            clearTimeout(this.intervalConnect)
            this.intervalConnect = null
          }
    	});
		this.socket.on('data', (data) => {
			this.onReceiveData(data);
		});
    	this.socket.on('close', (data) => {
        if(DEBUG)
		     {
           console.log("Socket close")
         }
    		if(this.isConnected || this.firstConnect){
          this.isConnected = false;
      		this.commandBuffer = '';
      		this.count = 0;

      		if(this.onConnected != null){
        			this.onConnected(false);
      		}
    		}
    		this.isConnected = false;
    		this.firstConnect = false;
	       //this.connect();
         this.intervalConnect = setTimeout(()=>{
           this.connect()
         }, 2000)
		});
		this.socket.on('error', () => {
      if(DEBUG)
			console.log("error::retry connecting...")
      		// if(this.isConnected || this.firstConnect){
        	// 	for (var i = 0; i < this.callbacks.length; i++) {
          // 			clearTimeout(this.callbacks[i].timer);
        	// 	}
        	// 	this.callbacks = [];
        	// 	this.commandBuffer = '';
		      //   this.count = 0;
		      //   this.callbacksDevicesChangedStatusAUTO = [];
		      //   this.callbacksAUTO = {}
          //
        	// 	if(this.onConnected != null) {
          // 			this.onConnected(false);
        	// 	}
      		// }
      		// this.firstConnect = false;
      		// this.isConnected = false;
		})
	}

  setOnConnectedCallback(callback)
  {
    this.onConnected = callback;
  }

  addDeviceListen(place, dev, callback)
  {
    this.callbacksDevicesChangedStatusAUTO.push({key:SocketClient.getDeviceIdString(dev) + place, callback:callback});
  }

  //dispatch event for CMD manual
  dispatchCMDManual(cmd, data)
  {
    if(this.callbacksAUTO[cmd])
    {
      for (var i = 0; i < this.callbacksAUTO[cmd].length; i++) {
        this.callbacksAUTO[cmd][i].callback(data);
      }
    }
  }

  addCMDListener(cmd, callback)
  {
    if(callback){
      if(this.callbacksAUTO[cmd] == undefined)
        this.callbacksAUTO[cmd] = []
      this.callbacksAUTO[cmd].push(callback);
    }
  }

  removeCMDListener(cmd, key)
  {
    if(this.callbacksAUTO[cmd])
    {
      for(var i = 0; i < this.callbacksAUTO[cmd].length; i++)
      {
        if(this.callbacksAUTO[cmd][i].key == key)
        {
          this.callbacksAUTO[cmd].remove(i);
          return;
        }
      }
    }
  }



  addDevicesListen(place,devices, callback)
  {
    for(var i = 0; i < devices.length; i ++)
    {
      this.addDeviceListen(place,devices[i], callback);
    }
  }

  removeDevicesListen(place, devices)
  {
    for(var i = 0; i < devices.length; i ++)
    {
      this.removeDeviceListen(place,devices[i]);
    }
  }

  removeDeviceListen(place, dev)
  {
    this.sendCommandString('$mdev=unreg', {dev:[dev]});

    var key = SocketClient.getDeviceIdString(dev) + place;
    for(var i = 0; i < this.callbacksDevicesChangedStatusAUTO.length; i++)
    {
      if(this.callbacksDevicesChangedStatusAUTO[i].key == key)
      {
        this.callbacksDevicesChangedStatusAUTO.remove(i);
        return;
      }
    }

  }

  isConnect(){
  	return this.isConnected;
  }

  send(place, key, data, callback){
    if(!this.isConnected)
    {
      //console.log("Now is disconnected !!! : ");
      	Alert.alert(
			null,
			"Now is disconnected !!!",
			[
            	{text: 'OK'},
            ]
		);
      if(callback)
        callback({err:'dis'});
      return;
    }
    try {
    	this.socket.write(data);
    } catch(err){
      if(DEBUG)
    	 console.log(err);
    }

    if( key != null && callback != null){
      this.callbacks.push({key:key, callback: callback, place:place, timer: setTimeout((key)=>{
        this.removeCallback(key, true);
        if(DEBUG)
          console.log("TimeOut = "  +key);
      }, LIFE_TIME, key)});

      if(this.mapCallbacks[place] == undefined)
      {
        this.mapCallbacks[place] = [];
      }
      this.mapCallbacks[place].push(key)
    }

    if(DEBUG)
      console.log("Send : " + data + " :: callbac = " + this.callbacks.length);

  }


  sendCommandStringDontCmdKey(cmdId, data)
  {
    return this.sendCommandStringInPlace('sendCommandStringDontCmdKey', cmdId, data, null, true);
  }

  sendCommandString(cmdId, data, callback, dontCmdKey){
    return this.sendCommandStringInPlace('sendCommandString', cmdId, data, callback, dontCmdKey);
  }

  sendCommandStringInPlace(place, cmdId, data, callback, dontCmdKey){
  // console.log('sendCommandString ' + place + '::' + cmdId + '::' + data + '::' + callback);
    var sSend = cmdId;
    if(data == null)
    {
      data = {};
    }

    if(dontCmdKey == null || dontCmdKey == false)
    {
      this.count ++;
      if(this.count > 10000)
        this.count = 0;
      var key = String((new Date()).getTime()) + '_' + String(this.count);
      data.cmdkey = key;

      sSend += JSON.stringify(data);
      sSend += '$end';
      this.send(place, key, sSend, callback);

      return key;
    }
    sSend += JSON.stringify(data);
    sSend += '$end';
    this.send(place, null, sSend, null);
    return null;

  }

  parseData(data)
  {

    return JSON.stringify(data);
  }

  onCallback(key, data){
    if(!key)
      return false;

    if(data.act)
    {
      data.err = 'act';
    }

    var index = -1;
    for (index = this.callbacks.length - 1; index >= 0; --index) {
        if(this.callbacks[index].key == key)
        {
          break;
        }
    }
    if(index >= 0)
    {
      this.mapCallbacks[this.callbacks[index].place].removeObject(this.callbacks[index].key)
      if(this.mapCallbacks[this.callbacks[index].place].length == 0)
      {
        delete this.mapCallbacks[this.callbacks[index].place];
      }
      let callback = this.callbacks[index].callback;
      clearTimeout(this.callbacks[index].timer);
      this.callbacks.remove(index);

      callback(data);


      return true;
    }

    return false;
  }

  removeCallbackInPlace(place)
  {
    if(this.mapCallbacks[place] == undefined)
      return;
    this.mapCallbacks[place] = []
  }

  removeCallback(key, invoke)
  {
    if(!key)
      return false;

    var index = -1;
    for (index = this.callbacks.length - 1; index >= 0; --index) {

        if(this.callbacks[index].key == key)
        {
          break;
        }
    }
    if(index >= 0)
    {
      if(invoke)
      {
        this.callbacks[index].callback({err:'timeout'});
      }else {
        clearTimeout(this.callbacks[index].timer);
      }
      if(this.mapCallbacks[this.callbacks[index].place])
      {
        this.mapCallbacks[this.callbacks[index].place].removeObject(this.callbacks[index].key)
        if(this.mapCallbacks[this.callbacks[index].place].length == 0)
        {
          delete this.mapCallbacks[this.callbacks[index].place];
        }
      }

      this.callbacks.remove(index);
      return true;
    }

    return false;
  }

	processCommand(command) {
    var idx = command.indexOf('{');
    if(idx < 0){
      console.log("Command tra ve sai!!!");
      return;
    }
    var cmd = command.slice(0, idx);
		command = command.slice(idx);
		var json = null;

    try {
      // command = command.replace('val":]','val":{}}]')
      json = JSON.parse(command);
    } catch (e) {
      console.log('ERROR::::command = '  + command);
      return;
    }

    if(!this.onCallback(json['cmdkey'], json))
    {
        if(cmd == CMD_DEVICE_CHANGE_STATUS)
        {
            for(var i = 0; i < json['dev'].length; i ++)
            {
                var device = json['dev'][i];

                if(device.val == null)
                  continue;

                var deviceId = SocketClient.getDeviceIdString(device);
                for(var j = 0; j < this.callbacksDevicesChangedStatusAUTO.length; j ++)
                {
                  if(this.callbacksDevicesChangedStatusAUTO[j].key.includes(deviceId))
                  {
                    this.callbacksDevicesChangedStatusAUTO[j].callback(device);
                  }
                }
            }
        }else
        {
          if(this.callbacksAUTO[cmd])
          {
            for (var i = 0; i < this.callbacksAUTO[cmd].length; i++) {
              this.callbacksAUTO[cmd][i].callback(json);
            }
          }
        }
    }
	}
	receivedString(str) {
    if(DEBUG)
      console.log("Receive : " + str );
		this.commandBuffer += str;
		//Process receive String
    var commands = this.commandBuffer.split("$end");
    if (commands.length > 0) {
      this.commandBuffer = commands[commands.length - 1];
    }
    for (var i = 0; i < commands.length - 1; i++) {
      this.processCommand(commands[i]);
    }

	}
	onReceiveData(data) {
  	  var string = Utf8ArrayToStr(data);
	  this.receivedString(string);
	}
	disconnect() {

	}
	static getInstance() {
		if (socket_client == null) {
			socket_client = new SocketClient();
		}
		return socket_client;
	}

  static getDeviceIdString(dev, suffix)
  {
    var s ;
    if(suffix == null){
      s = dev.devid + "_" + dev.ord + "_" + dev.net;
    }
    else {
      s = (suffix + "_" + dev.devid + "_" + dev.ord + "_" + dev.net);
    }
    return s;
  }
}

module.exports = SocketClient;
