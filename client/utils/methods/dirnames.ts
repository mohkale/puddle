/**
 * Return a string consisting of all parent directories of `path`.
 *
 * @param path the path for which we're extracting dirnames.
 * @param seperator = "/", the path seperator.
 *
 * @example
 * dirNames('foo/bar/baz/bag/bar') // => ['foo/bar/baz/bag', 'foo/bar/baz', 'foo/bar', 'foo']
 */
export function dirNames(path: string, seperator?: string): string[] {
  const sep = seperator || '/'

  return path
    .split(sep)
    .slice(0, -1)
    .reduce((acc, path) => {
      acc.push(acc.length === 0 ? path : `${acc[acc.length-1]}${sep}${path}`)
      return acc
    }, [] as string[])
}
