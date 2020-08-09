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
