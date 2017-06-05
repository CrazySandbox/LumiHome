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
  
}

/**
 * Encodes multi-byte Unicode string into utf-8 multiple single-byte characters
 * (BMP / basic multilingual plane only).
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars.
 *
 * Can be achieved in JavaScript by unescape(encodeURIComponent(str)),
 * but this approach may be useful in other languages.
 *
 * @param {string} strUni Unicode string to be encoded as UTF-8.
 * @returns {string} Encoded string.
 */
export function Utf8Encode(strUni) {
  return String(strUni).replace(
    /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
    function (c) {
      var cc = c.charCodeAt(0);
      return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
    }
  ).replace(
    /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
    function (c) {
      var cc = c.charCodeAt(0);
      return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
    }
  );
}

/**
 * Decodes utf-8 encoded string back into multi-byte Unicode characters.
 *
 * Can be achieved JavaScript by decodeURIComponent(escape(str)),
 * but this approach may be useful in other languages.
 *
 * @param {string} strUtf UTF-8 string to be decoded back to Unicode.
 * @returns {string} Decoded string.
 */
export function Utf8Decode(strUtf) {
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  return String(strUtf).replace(
    /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
    function (c) {  // (note parentheses for precedence)
      var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | ( c.charCodeAt(2) & 0x3f);
      return String.fromCharCode(cc);
    }
  ).replace(
    /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
    function (c) {  // (note parentheses for precedence)
      var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
      return String.fromCharCode(cc);
    }
  );
}
