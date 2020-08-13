import React from 'react';
import { FileTreeEntry } from '@client/utils';

import { FileRow } from './file-row';
import { DirectoryRow } from './dir-row';

interface FileTreeProps {
  root: string
  tree: FileTreeEntry
}

export function FileTree(props: FileTreeProps) {
  const entries = Object.entries(props.tree)
    .map(([key, val]) => {
      const fullPath = props.root ? `${props.root}/${key}` : key

      if (Number.isInteger(val)) {
        return (
          <li key={key}>
            <FileRow path={fullPath} name={key} fileId={val} />
          </li>
        )
      } else {
        return (
          <li key={key} className="file-tree__directory">
            <DirectoryRow path={fullPath} name={key} />
            <FileTree {...props} root={fullPath} tree={val} />
          </li>
        )
      }
    })

  return <ul className="torrent-details__file-tree">{entries}</ul>;
}
