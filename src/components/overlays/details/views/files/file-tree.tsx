import React from 'react';
import { FileTreeEntry } from '@puddle/utils';

import { FileRow } from './file-row';
import { DirectoryRow } from './dir-row';

interface FileTreeProps {
  tree: FileTreeEntry
}

export function FileTree(props: FileTreeProps) {
  const entries = Object.entries(props.tree).map(([key, val]) => {
    if (Number.isInteger(val)) {
      return (
        <li key={key}>
          <FileRow name={key} fileId={val} />
        </li>
      )
    } else {
      return (
        <li key={key} className="directory">
          <DirectoryRow name={key} />
          <FileTree {...props} tree={val} />
        </li>
      )
    }
  })

  return <ul className="file-tree">{entries}</ul>;
}
