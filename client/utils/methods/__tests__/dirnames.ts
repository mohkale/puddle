import { dirNames } from '../dirnames';

describe('dirnames', () => {
  it('contains all directories of path', () => {
    const path = 'foo/bar/baz/bag'
    const paths = dirNames(path)
    expect(paths).toContain('foo/bar/baz')
    expect(paths).toContain('foo/bar')
    expect(paths).toContain('foo')
  })

  it('excludes the path itself', () => {
    const path = 'foo/bar/baz/bag'
    expect(dirNames(path)).not.toContain(path)
  })
})
