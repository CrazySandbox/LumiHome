'use trick';

import WifiAudio from '../actions/speaker/wifiaudio';

export default (ip) => {
  return fetch('http://' + ip + '/httpapi.asp?command=getStatus', {method: "GET"})
    .then((response) => Promise.all([response, response.json()]))
}
// WifiAudio.getStatus=(url, callback)=>
// {
//   fetch('http://' + url + '/httpapi.asp?command=getStatus', {method: "GET"})
//   .then((response) => response.json())
//   .then((responseData) => {
//       if(callback)
//       {
//         callback(responseData)
//       }
//   })
//   .catch((error) => {
//
//      })
//   .done();
// }
