import React, { Fragment, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from '@puddle/components';
import { TorrentDetailed } from '@puddle/models';
import { constructFileTree, FileTreeEntry, scaleBytes } from '@puddle/utils';
import { TransmissionTorrentFiles, TransmissionTorrentFileStats } from '@puddle/transmission';
import { selectTorrentDetailsOverlayFiles, selectTorrentDetailsOverlaySelectedFiles, torrentDetailsOverlayClearFileSelection } from '@puddle/stores';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@puddle/utils/fontawesome';
import { Checkbox } from '@puddle/components';

import '@cstyles/scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

import { FileTree } from './file-tree';

import {
  BandwidthPrioritySlider, isPriorityType, ExtendedPriorityType
} from '@puddle/components';

function torrentFileTree(files: TransmissionTorrentFiles[]) {
  return {
    fileCount: files.length,
    fileTree: constructFileTree(files),
  }
}

function SubmissionControls() {
  const dispatch = useDispatch()
  const selectedFiles = useSelector(selectTorrentDetailsOverlaySelectedFiles)
  if (selectedFiles.length === 0)
    return null

  const clearSelected = () => dispatch(torrentDetailsOverlayClearFileSelection())

  return (
    <div className="submission-controls">
      <p>
        <span className="highlight">{selectedFiles.length}</span> selected files
      </p>
      <button onClick={clearSelected}>Clear Selection</button>

      <select id="priority-selector" name="priority">
        <option value="" disabled selected>Select a Priority</option>
        <option value="">Don{"'"}t Download</option>
        <option value="-1">Low</option>
        <option value="0">Normal</option>
        <option value="1">High</option>
      </select>
    </div>
  )
}

export function FilesView() {
  const files = useSelector(selectTorrentDetailsOverlayFiles)
  const [{ fileTree, fileCount }, setFileTree] = useState(() => torrentFileTree(files))

  if (fileCount !== files.length) {
    // in case we were fetching the torrent list on first call and
    // it's now been supplied.
    setFileTree(() => torrentFileTree(files))
  }

  return (
    <div className="torrent-files-view">
      <Scrollbar>
        <FileTree tree={fileTree} />
      </Scrollbar>

      <SubmissionControls/>
    </div>
  )
}
