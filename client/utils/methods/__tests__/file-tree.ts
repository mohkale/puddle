import { constructFileTree as fileTree, treeTraverse } from '../file-tree';

test('empty file list gives an empty object', () => {
  expect(fileTree([])).toEqual({})
})

test('single file list gives single depth tree', () => {
  const files = [{ name: 'foo' }]
  expect(fileTree(files)).toEqual({ foo: 0 })
})

test('file-tree maintains order of original file-list', () => {
  const fileA = { name: 'foo' }
  const fileB = { name: 'bar' }
  expect(fileTree([fileA, fileB])).toEqual({ foo: 0, bar: 1 })
  expect(fileTree([fileB, fileA])).toEqual({ foo: 1, bar: 0 })
})

test('file-tree supports nesting into directories', () => {
  expect(fileTree([{ name: 'foo/bar/baz' }])).toEqual({ foo: { bar: { baz: 0 } } })
})

test('order of original file list is maintained even in subdirectories', () => {
  const names = [{ name: 'foo/bar/baz' }, { name: 'baz/bar/foo' }]
  const tree = {
    foo: { bar: { baz: 0 } },
    baz: { bar: { foo: 1 } }
  }
  expect(fileTree(names)).toEqual(tree)
})

test('multiple files in the same directory are grouped in the file-tree', () => {
  const fileNames = [{ name: 'foo/bar' }, { name: 'foo/baz' }, { name: 'foo/bag' }]
  expect(fileTree(fileNames)).toEqual({ foo: { bar: 0, baz: 1, bag: 2 } })
})

describe('treeTraverse', () => {
  it('can traverse to a file', () => {
    const tree = { foo: { bar: { baz: 0 } } }
    expect(treeTraverse(tree, 'foo/bar/baz')).toBe(0)
  })

  it('can traverse to a directory', () => {
    const file = { baz: 0 }
    const tree = { foo: { bar: file } }
    expect(treeTraverse(tree, 'foo/bar')).toEqual(file)
  })

  it("doesn't throw type error when traversing undefined paths", () => {
    expect(() => treeTraverse({}, 'foo/bar/baz/bag')).not.toThrow(TypeError)
  })
})
