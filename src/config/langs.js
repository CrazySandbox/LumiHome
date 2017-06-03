'use strick';

import LocalizedString from 'react-native-localization';

let langs = new LocalizedString({
  en: {
    //****Tabbar
    home: 'HOME',
    room: 'ROOM',
    scene: 'SCENE',
    camera: 'CAMERA',
    security: 'SECURITY',
    rule: 'RULE',
    speaker: 'SPEAKER',
    //***********

    forgotpass: 'Forgot password ?',
    footer: 'Lumi.,jsc',
    loginUsername: 'Username',
    loginPass: 'Password',
    loginLogin: 'LOGIN',
    listhome: 'List home',
    namehome: 'Name: ',
    domainhome: 'Domain: ',
    machome: 'Mac: ',
    statushome: 'Status: ',
    online: 'Online',
    offline: 'Offline',
    delete: 'Delete',
    edit: 'Edit',
    save: 'SAVE',
    settingapp: 'Setting',
    ip: 'IP Address',
    port: 'PORT',
    menu: 'MENU',
    listhomezero: 'No home',
    backlogin: 'Back to Login',

    //*******Title navBar
    registerNav: 'Register',
    forgotpassNav: 'Forgot Password',
    setLocalNav: 'Setting Local',

    //******Error
    errorConnect: 'Check connect to internet',
    errorConnectToSever: 'Unconnect to Server',
    errorUser: 'Username is value null',
    errorPass: 'Password is value null',
    errorLogin: 'User or password not match',
    errorUserSpace: 'Username is not space',

    //*******speaker
    addSpeaker: 'Add Speaker',
    noSpeaker: 'Nothing here!',
    playing: 'Playing:',
    pause: 'Pause:',
    stop: 'Stop:',
    renameSpeaker: 'Rename',
    joinSpeaker: 'Jonin Speaker',
    unJoinSpeaker: 'Unjoin Speaker',
    infoSpeaker: 'Speaker Info',
    alarmSpeaker: 'Alarm Clock',
    sleepTimerSpeaker: 'Sleep Timer',
    backSpeaker: 'Back',
    closedTimer: 'OK',
    speakerName: 'Speaker Name',
    ipSpeaker: 'IP',
    macSpeaker: 'MAC',
    ssid: 'SSID',
    hideSSID: 'Hide SSID',
    filmwareSpeaker: 'Firmware Version',
    buildDateSpeaker: 'Build Date',
    uuid: 'UUID',
  },
  vn: {
    //****Tabbar
    home: 'NHÀ',
    room: 'PHÒNG',
    scene: 'CẢNH',
    camera: 'CAMERA',
    security: 'AN NINH',
    rule: 'AUTOMATIC',
    speaker: 'SPEAKER',
    //***********

    forgotpass: 'Quên mật khẩu ?',
    footer: 'Lumi.,jsc',
    loginUsername: 'Tên đăng nhập',
    loginPass: 'Mật khẩu',
    loginLogin: 'ĐĂNG NHẬP',
    listhome: 'Danh sách nhà',
    namehome: 'Tên nhà: ',
    domainhome: 'Domain: ',
    machome: 'Mac: ',
    statushome: 'Trạng thái: ',
    online: 'Đang kết nối',
    offline: 'Mất kết nối',
    delete: 'Xoá',
    edit: 'Sửa',
    save: 'Lưu lại',
    settingapp: 'Cài đặt',
    ip: 'IP nội mạng',
    port: 'Cổng nội mạng',
    menu: 'MENU',
    listhomezero: 'Không có nhà nào ở đây',
    backlogin: 'Quay lại Login',

    //*******Title navBar
    registerNav: 'Tạo tài khoản',
    forgotpassNav: 'Quên mật khẩu',
    setLocalNav: 'Cài đặt Local',

    //******Error
    errorConnect: 'Kiểm tra kết nối internet',
    errorConnectToSever: 'Không có kết nối đến sever',
    errorUser: 'Tên đăng nhập trống',
    errorPass: 'Mật khẩu trống',
    errorLogin: 'Tên đăng nhập hoặc mật khẩu không đúng',
    errorUserSpace: 'Tên đăng nhập không được chứa khoảng trắng',

    //*******speaker
    addSpeaker: 'Thêm Speaker',
    noSpeaker: 'Không có speaker nào ở đây!',
    playing: 'Playing:',
    pause: 'Pause:',
    stop: 'Stop:',
    renameSpeaker: 'Đổi tên',
    joinSpeaker: 'Join Speaker',
    unJoinSpeaker: 'Unjoin Speaker',
    infoSpeaker: 'Thông tin Speaker',
    alarmSpeaker: 'Báo thức',
    sleepTimerSpeaker: 'Hẹn giờ',
    backSpeaker: 'Quay lại',
    closedTimer: 'Xác nhận',
    speakerName: 'Tên Speaker',
    ipSpeaker: 'IP',
    macSpeaker: 'MAC',
    ssid: 'SSID',
    hideSSID: 'Ẩn SSID',
    filmwareSpeaker: 'Phiên bản phần mềm',
    buildDateSpeaker: 'Build Date',
    uuid: 'UUID',
  }
});

module.exports = langs;
