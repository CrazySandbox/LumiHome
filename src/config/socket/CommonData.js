'use strict';

import {
  Alert
} from 'react-native';

import SocketClient from './socket-client'

var _CommonData = null;
const deviceTypes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '128', '129', '130', '131', '132'];
class CommonData{
  constructor()
  {
    this.roomList = [];
    this.floorList = [];
    this.devices = {};
    this.cmdCallback = [];
    this.onRefreshCallback  = null;
    this.domain = '';
    this.macaddress = '';
    this.listUser = [];

    this.token = ''

    this.currentUser = '';

    SocketClient.getInstance().addCMDListener('$mhome=autoshortcut',{key:'CommonData', callback:this.autoShortcut.bind(this)})
  }

  setUser(user)
  {
    this.currentUser = user
  }

  getCurrentUser()
  {
    return this.currentUser;
  }

  autoShortcut(json)
  {
    if(json.type == 0)
    {
      for(var i = 0; i < this.roomList.length; i ++)
      {
        if(this.roomList[i].roomid == json.val.roomid)
        {
          this.roomList[i].shortcut = json.shortcut;
          return;
        }
      }
    }else {
      for (var i = 0; i < deviceTypes.length; i++) {
        if(this.devices[deviceTypes[i]])
        {
          for (var j = 0; j < this.devices[deviceTypes[i]].length; j++) {
            if(this.devices[deviceTypes[i]][j].devkey == json.val.devkey)
            {
              this.devices[deviceTypes[i]][j].shortcut = json.shortcut;
              return;
            }
          }
        }
      }
    }
  }

  getToken()
  {
    return this.token;
  }

  setToken(token)
  {
    this.token = token;
  }

  static getInstance()
  {
    if(_CommonData == null)
    {
      _CommonData = new CommonData();
    }
    return _CommonData;
  }

  parseComponentCode(devid, devkey, componentid)
  {
    return String(this.macaddress) + String(devid) + String(devkey) + componentid
  }

  setMacAdress(adress)
  {
    this.macaddress = adress;
  }

  getMacAdress()
  {
    return this.macaddress;
  }

  setDomain(domain)
  {
    this.domain = domain;
  }

  getDomain()
  {
    return this.domain;
  }

  getUsers()
  {
    return this.listUser;
  }

  setUsers(arr)
  {
    this.listUser = arr;
  }

  isEmptyDevices()
  {
    for (var i = 0; i < deviceTypes.length; i++) {
      if(this.devices[deviceTypes[i]] && this.devices[deviceTypes[i]].length > 0)
      {
        return false;
      }
    }

    return true;
  }

  clearRoom()
  {
    SocketClient.getInstance().removeCMDListener('CommonData')
    this.cmdCallback.clear()
    this.roomList.clear()
    this.floorList.clear();
    for (var i = 0; i < deviceTypes.length; i++) {
      delete this.devices[deviceTypes[i]];
    }
  }

  addDevice(device)
  {
    if(this.cmdCallback.length > 0)
    {
      return;
    }
    if(this.devices[device.type] == undefined)
    {
      this.devices[device.type] = [];
    }
    this.devices[device.type].push(device)
  }
  addDevice2(device)
  {
    if(this.devices[device.type] == undefined)
    {
      this.devices[device.type] = [];
    }
    this.devices[device.type].push(device)
  }

  getDevices(type)
  {
    if (this.devices[type] == undefined) {
      return [];
    }
    return this.devices[type];
  }


  getDevice(devkey)
  {
    for (var i = 0; i < deviceTypes.length; i++) {
      if(this.devices[deviceTypes[i]])
      {
        for (var j = 0; j < this.devices[deviceTypes[i]].length; j++) {
          if(this.devices[deviceTypes[i]][j].devkey == devkey)
          {
            return this.devices[deviceTypes[i]][j]
          }
        }
      }
    }
    return undefined
  }

  getRoomsShortcut()
  {
    var rooms = [];
    for (var i = 0; i < this.roomList.length; i++) {
      if(this.roomList[i].shortcut == '1')
      {
        rooms.push(this.roomList[i]);
      }
    }

    return rooms;
  }

  getDevicesShortCut()
  {
    var devs = [];
    for (var i = 0; i < deviceTypes.length; i++) {
      if(this.devices[deviceTypes[i]])
      {
        for (var j = 0; j < this.devices[deviceTypes[i]].length; j++) {
          if(this.devices[deviceTypes[i]][j].shortcut == '1')
          {
            devs.push(this.devices[deviceTypes[i]][j]);
          }
        }
      }
    }
    return devs;
  }

  getFloorById(id)
  {
    for(var i = 0; i < this.floorList.length; i ++)
    {
      if(this.floorList[i].floorid == id)
      {
        return this.floorList[i];
      }
    }

    return null;
  }

  syncRoomFloor()
  {
    for(var i = 0; i < this.roomList.length; i ++)
    {
      let floor = this.getFloorById(this.roomList[i].floorid)
      if(floor == null)
        continue;
      this.roomList[i].floorid = floor.floorid
      this.roomList[i].floorname = floor.name
    }

    //Lay danh sach devices
    this.cmdCallback.push(SocketClient.getInstance().sendCommandStringInPlace('CommonData', "$mdev=lst", {domain:this.domain, type:[]}, (data)=>{
      if(data.err != null || data.dev.length == 0)
      {
        this.cmdCallback.removeObject(data.cmdkey);
        if(this.onRefreshCallback && this.cmdCallback.length == 0)
        {
          this.onRefreshCallback();
        }
        return;
      }


      var devicesIR2 = [];

      for (var j = 0; j < data.dev.length; j++) {
        var rooooom = this.getRoom(data.dev[j].roomid)
        if(rooooom == undefined)
        {
          rooooom = {
            floorname:'Unknown',
            name:'Unknown',
            floorid:'-1'
          }
        }

        if(data.dev[j].type == 5) //IR other
        {
          devicesIR2.push(data.dev[j]);
        }else {
          data.dev[j].floorid = rooooom.floorid;
          data.dev[j].floorname = rooooom.floorname;

          data.dev[j].roomname = rooooom.name;

          CommonData.getInstance().addDevice2(data.dev[j]);
        }
      }


      for (var i = 0; i < devicesIR2.length; i++) {
        let devvvvv = devicesIR2[i];
        this.cmdCallback.push(SocketClient.getInstance().sendCommandStringInPlace('CommonData', '$mdev=irroom', devvvvv, (data2)=>{
            if(data2.err == null)
            {
              for (var j = 0; j < data2.lst.length; j++) {
                let dev = data2.lst[j];

                if(dev.typeir == 'null')
                {
                  continue;
                }
                var rooooom = this.getRoom(dev.roomid)
                if(rooooom == undefined)
                {
                  rooooom = {
                    floorname:'Unknown',
                    name:'Unknown',
                    floorid:'-1'
                  }
                }

                dev.devid = data2.devid;
                dev.ord = data2.ord;
                dev.net = data2.net;
                dev.type = data2.type;
                dev.iconkey = devvvvv.iconkey;

                dev.floorid = rooooom.floorid;
                dev.floorname = rooooom.floorname;

                dev.roomname = rooooom.name;

                CommonData.getInstance().addDevice2(dev);
              }

              this.cmdCallback.removeObject(data2.cmdkey);
              if(this.onRefreshCallback && this.cmdCallback.length == 0)
              {
                this.onRefreshCallback();
              }
            }else {

                this.cmdCallback.removeObject(data2.cmdkey);
                if(this.onRefreshCallback && this.cmdCallback.length == 0)
                {
                  this.onRefreshCallback();
                }
            }
        }));
      }

      this.cmdCallback.removeObject(data.cmdkey);
      if(this.onRefreshCallback && this.cmdCallback.length == 0)
      {
        this.onRefreshCallback();
      }

    }));
  }

  refresh(domain, onRefreshCallback)
  {
    if(this.cmdCallback.length > 0)
    return;
    this.cmdCallback.clear();
    this.onRefreshCallback = onRefreshCallback;

    this.clearRoom();

    //Lay danh sach Tang
    this.cmdCallback.push(SocketClient.getInstance().sendCommandStringInPlace('CommonData', "$mfloor=lst", {domain:domain}, (data)=>{
      if(data.err != null || data.lst.length == 0)
      {
        this.cmdCallback.removeObject(data.cmdkey);
        if(this.onRefreshCallback && this.cmdCallback.length == 0)
        {
          this.onRefreshCallback();
        }
        return;
      }

      this.floorList = data.lst;
      if(this.roomList.length > 0)
      {
        this.syncRoomFloor();
      }

      this.cmdCallback.removeObject(data.cmdkey);
      if(this.onRefreshCallback && this.cmdCallback.length == 0)
      {
        this.onRefreshCallback();
      }

    }));

    //Lay danh sach Phong
    this.cmdCallback.push(SocketClient.getInstance().sendCommandStringInPlace('CommonData', "$mroom=lstdomain", {domain:domain}, (data)=>{
      if(data.err != null || data.lst.length == 0)
      {
        this.cmdCallback.removeObject(data.cmdkey);
        if(this.onRefreshCallback && this.cmdCallback.length == 0)
        {
          this.onRefreshCallback();
        }
        return;
      }

      this.roomList = data.lst;
      if(this.floorList.length > 0)
      {
        this.syncRoomFloor();
      }

      this.cmdCallback.removeObject(data.cmdkey);
      if(this.onRefreshCallback && this.cmdCallback.length == 0)
      {
        this.onRefreshCallback();
      }

    }));

  }

  addRooms(rooms)
  {
    this.roomList = this.roomList.concat(rooms)
  }

  addRoom(room)
  {
    this.roomList.push(room)
  }

  getRoom(roomid)
  {
    for (var i = 0; i < this.roomList.length; i++) {
      if(this.roomList[i].roomid == roomid)
      {
        return this.roomList[i];
      }
    }

    return null;
  }

}

module.exports = CommonData;
