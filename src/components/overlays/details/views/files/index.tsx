import React, { Fragment, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from '@puddle/components';
import { TorrentDetailed } from '@puddle/models';
import { constructFileTree, FileTreeEntry, scaleBytes } from '@puddle/utils';
import { ClientContext } from '@puddle/components';
import { TransmissionTorrentFiles, TransmissionTorrentFileStats } from '@puddle/transmission';
import {
  TransmissionTorrentStatus as TorrentStatus,
  TransmissionPriorityType as PriorityType
} from '@puddle/transmission';
import { selectTorrentDetailsOverlayFiles, selectTorrentDetailsOverlaySelectedFiles, torrentDetailsOverlayClearFileSelection } from '@puddle/stores';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@puddle/utils/fontawesome';
import { Checkbox } from '@puddle/components';
import { Select } from '@puddle/components';

import '@cstyles/scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

import { FileTree } from './file-tree';

import {
  BandwidthPrioritySlider, isPriorityType, ExtendedPriorityType, PRIORITY_LABELS
} from '@puddle/components';

import {
  selectTorrentDetailsOverlayFileProps,
  torrentDetailsOverlaySelectFiles,
  torrentDetailsOverlayDeselectFiles,
  setFilePriorities
} from '@puddle/stores';

function torrentFileTree(files: TransmissionTorrentFiles[]) {
  return {
    fileCount: files.length,
    fileTree: constructFileTree(files),
  }
}

const PRIORITY_SELECT_OPTIONS: { value: ExtendedPriorityType, label: string }[] = [
  { value: 'dont-download', label: PRIORITY_LABELS['dont-download'] },
  { value: PriorityType.LOW, label: PRIORITY_LABELS[PriorityType.LOW] },
  { value: PriorityType.NORM, label: PRIORITY_LABELS[PriorityType.NORM] },
  { value: PriorityType.HIGH, label: PRIORITY_LABELS[PriorityType.HIGH] },
];


function SubmissionControls() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const selectedFiles = useSelector(selectTorrentDetailsOverlaySelectedFiles)
  if (selectedFiles.length === 0)
    return null

  const clearSelected = () => dispatch(torrentDetailsOverlayClearFileSelection())

  const handlePriorityChange = (p: { value: ExtendedPriorityType }) => {
    dispatch(setFilePriorities(transmission, selectedFiles, p.value))
  }

  return (
    <div className="submission-controls">
      <p>
        <span className="highlight">{selectedFiles.length}</span> selected files
      </p>
      <button onClick={clearSelected}>Clear Selection</button>

      <Select
        menuPlacement="top"
        isSearchable={false}
        options={PRIORITY_SELECT_OPTIONS}
        onChange={handlePriorityChange}
        placeholder="Select a Priority" />
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
