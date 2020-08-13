import React from 'react';
import { useSelector } from 'react-redux';

import { PRIORITY_LABELS, Scrollbar } from '@client/components';
import { selectTorrentDetailsOverlayFileTree } from '@client/stores';

import { FileTree } from './file-tree';
import { SubmissionControls } from './control-bar';

export function FilesView() {
  const { tree: fileTree } = useSelector(selectTorrentDetailsOverlayFileTree)

  return (
    <div className="torrent-details__files-view">
      <Scrollbar>
        <FileTree root='' tree={fileTree} />
      </Scrollbar>

      <SubmissionControls/>
    </div>
  )
}
