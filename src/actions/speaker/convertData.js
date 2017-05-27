'use strick';

export function hex2a(hexx) {
  if(!hexx)
  return 'Unknown'
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
