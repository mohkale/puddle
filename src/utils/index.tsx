const BYTE_SCALES: [string, number][] = [
    ['t', 1099511627776.0],
    ['g', 1073741824.0],
    ['m', 1048576.0],
    ['k', 1024.0]
]

export function scaleBytes(bytes: number): [number, string] {
    const [scale, mul] = BYTE_SCALES.find((([_, val]) => bytes >= val)) || BYTE_SCALES[BYTE_SCALES.length-1];

    return [bytes/mul, scale]
}

// https://github.com/tremc/tremc/blob/master/tremc#L3362
export function timeFormat(duration: number): string {
    return duration.toString()
}

export function padString(str: string, length: number, char: string='0') {
    if (str.length >= length) {
        return str
    }
    let i = length - str.length;
    while (i-- > 0) {
        str = char + str
    }
    return str;
}

// source [[https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string/54947757][here]].
export function extractHostname(url: string): string {
  var hostname: string = '';
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

