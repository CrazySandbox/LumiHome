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

export function convertHexToBin(input){
    input = String(input).toLowerCase()
    if(input.length == 1)
    {
      input = '0' + input
    }

    var output = '';

    for (var i = 0; i < input.length; i++) {
      switch (input.charAt(i)) {
        case '0':
          output += '0000'
          break;
        case '1':
          output += '0001'
          break;
        case '2':
          output += '0010'
          break;
        case '3':
          output += '0011'
          break;
        case '4':
          output += '0100'
          break;
        case '5':
          output += '0101'
          break;
        case '6':
          output += '0110'
          break;
        case '7':
          output += '0111'
          break;
        case '8':
          output += '1000'
          break;
        case '9':
          output += '1001'
          break;
        case 'a':
          output += '1010'
          break;
        case 'b':
          output += '1011'
          break;
        case 'c':
          output += '1100'
          break;
        case 'd':
          output += '1101'
          break;
        case 'e':
          output += '1110'
          break;
        case 'f':
          output += '1111'
          break;
        default:

      }
    }

    return  output;
}

export function convertBintoHex(input){
    input = ""+input;
    while(input.length < 8){
        input = "0" + input;
    }

    input = [input.substring(0,4),input.substring(4,8)];
    var output = "";

    for(var i in input){
        switch(input[i]){
            case "0000":
                output += 0;
                break;
            case "0001":
                output += 1;
                break;
            case "0010":
                output += 2;
                break;
            case "0011":
                output += 3;
                break;
            case "0100":
                output += 4;
                break;
            case "0101":
                output += 5;
                break;
            case "0110":
                output += 6;
                break;
            case "0111":
                output += 7;
                break;
            case "1000":
                output += 8;
                break;
            case "1001":
                output += 9;
                break;
            case "1010":
                output += 'A';
                break;
            case "1011":
                output += 'B';
                break;
            case "1100":
                output += 'C';
                break;
            case '1101':
                output += 'D';
                break;
            case '1110':
                output += 'E';
                break;
            case '1111':
                output += 'F';
                break;
        }
    }
    return  output;
}

export function Utf8ArrayToStr(array) {
  return array
  // var out, i, len, c;
  // var char2, char3;
  //
  // out = "";
  // len = array.length;
  // i = 0;
  // while(i < len) {
  // c = array[i++];
  // switch(c >> 4)
  // {
  //   case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
  //     // 0xxxxxxx
  //     out += String.fromCharCode(c);
  //     break;
  //   case 12: case 13:
  //     // 110x xxxx   10xx xxxx
  //     char2 = array[i++];
  //     out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
  //     break;
  //   case 14:
  //     // 1110 xxxx  10xx xxxx  10xx xxxx
  //     char2 = array[i++];
  //     char3 = array[i++];
  //     out += String.fromCharCode(((c & 0x0F) << 12) |
  //                    ((char2 & 0x3F) << 6) |
  //                    ((char3 & 0x3F) << 0));
  //     break;
  // }
  // }
  // return out;
}
