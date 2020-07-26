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

// source [[https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string/54947757][here]]. TODO memoize.
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

/**
 * Find the set partition of two collections of the same type.
 *
 * A set partition is the list of elements that have been removed
 * from the first collection and the list of elements added to the
 * first collection.
 *
 * @returns [removed, added] a tuple of the change in state.
 */
export function setPartition<T>(a: T[], b: T[]) {
  const aSet = new Set(a), bSet = new Set(b)
  return [a.filter(x => !bSet.has(x)),
          b.filter(y => !aSet.has(y))]
}

export function arrayRemove<T>(arr: T[], elem: T, errorHandler?: VoidFunction) {
  const index = arr.indexOf(elem)
  if (index === -1) {
    errorHandler && errorHandler!()
  } else {
    arr.splice(index, 1)
  }
}
