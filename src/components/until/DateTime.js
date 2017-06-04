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

export const parseTime = (time) => {
  let d = null
  if(time < 0) {
    time = 0 - time
    time = parseInt(time * 0.001)
    let h = parseInt(time / 3600)
    let m = parseInt((time - h * 3600) / 60)
    let s = time - h * 3600 - m * 60
    if(h > 0) {
      d = h < 10 ? "0" + h : h
      d += ":"
      d += m < 10 ? "0" + m : m
      d += ":"
      d += s < 10 ? "0" + s : s
    } else {
      d = m < 10 ? "0" + m : m
      d += ":"
      d += s < 10 ? "0" + s : s
    }
    d = "-" + d
  } else {
    time = parseInt(time * 0.001)
    let h = parseInt(time / 3600)
    let m = parseInt((time - h * 3600) / 60)
    let s = time - h * 3600 - m * 60
    if(h > 0) {
      d = h < 10 ? "0" + h : h
      d += ":"
      d += m < 10 ? "0" + m : m
      d += ":"
      d += s < 10 ? "0" + s : s
    } else {
      d = m < 10 ? "0" + m : m
      d += ":"
      d += s < 10 ? "0" + s : s
    }
  }
  return d;
}
