type FileNameArray = { name: string }[]

/**
 * Prepare a file collection to be converted to a file tree.
 * This just sorts the files and then merges them with their
 * indexes in the original file array.
 */
function prepareFiles(files: FileNameArray) {
  // order the filelist by the name of each file
  return files
    .map((file, i) => {
      return {
        id: i,
        name: file.name,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

export type FileTreeEntry =
  { [key: string]: number } |
  { [key: string]: FileTreeEntry }

/**
 * Convert a list of file paths with an associated identifier
 * into a tree like structure (centered around javascript objects).
 *
 *
 *
 */
export function constructFileTree(files: FileNameArray) {
  const collection: FileTreeEntry = {}

  prepareFiles(files).forEach(file => {
    let root = collection
    const paths = file.name.split('/')
    paths.slice(0, -1).forEach(path => {
      if (root[path] === undefined)
        root[path] = {}
      root = root[path] as { [key: string]: FileTreeEntry }
    })
    root[paths[paths.length - 1]] = file.id
  })

  return collection
}

/**
 * expand a full path in a file-tree, returning the entry associated
 * with the path.
 *
 * @param tree the tree to be traversed
 * @param path the path of an entry at aribtrary depth in `tree`.
 */
export function treeTraverse(tree: FileTreeEntry, path: string): number|FileTreeEntry|undefined {
  return path
    .split('/')
    .reduce((root, path) => root && root[path] as FileTreeEntry,
            tree)
}
