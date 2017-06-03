'use strick';

//date Sun Jun 04 2017 02:52:05 GMT+0700 (+07)
export const getFullDateTime = () => {
  let d = new Date()
  return d
}

//date 6/4/2017, 2:52:05 AM
export const getDateTime = () => {
  let d = new Date().toLocaleString()
  return d
}

export const getDate = () => {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let d = ''
  d = day < 10 ? '0' + day : String(day)
  d += month < 9 ? '0' + (month + 1) : String(month + 1)
  d += String(year)
  return d
}

export const getDateTimeSpeaker = () => {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let sec = date.getSeconds()
  let d = ''
  d = year
  d += month < 9 ? '0' + (month + 1) : (month + 1)
  d += day < 10 ? '0' + day : day
  d += hour < 10 ? '0' + hour : hour
  d += minute < 10 ? '0' + minute : minute
  d += sec < 10 ? '0' + sec : sec
  return d
}
