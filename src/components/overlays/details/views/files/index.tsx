import React, { Fragment, useContext, useState } from 'react';
import { TorrentDetailsContext } from '../../context';
import { Badge } from '@puddle/components';
import { TorrentDetailed } from '@puddle/models';
import { constructFileTree, FileTreeEntry, scaleBytes } from '@puddle/utils';
import { TransmissionTorrentFiles, TransmissionTorrentFileStats } from '@puddle/transmission';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@puddle/utils/fontawesome';
import { Checkbox } from '@puddle/components';

import '@cstyles/scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

import { FilesViewContext } from './context';
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

function SetPriorityComboBox(props: Omit<React.HTMLProps<HTMLSelectElement>, 'id' | 'name'>) {
  return (
    <select {...props} id="priority-selector" name="priority">
      <option value="" disabled selected>Select a Priority</option>
      <option value="">Don{"'"}t Download</option>
      <option value="-1">Low</option>
      <option value="0">Normal</option>
      <option value="1">High</option>
    </select>
  )
}

export function FilesView() {
  const { torrent } = useContext(TorrentDetailsContext)
  const [{ fileTree, fileCount }, setFileTree] = useState(() => torrentFileTree(torrent.files))
  const [selectedTorrents, setSelectedTorrents] = useState<number[]>([])
  // const [expandedDirectories, setExpandedDirectories] = useState<string[]>([])

  if (fileCount !== torrent.files.length) {
    // in case we were fetching the torrent list on first call and
    // it's now been supplied.
    setFileTree(() => torrentFileTree(torrent.files))
  }

  const setFilePriorities = (files: number[], p: ExtendedPriorityType) => {
    if (isPriorityType(p)) {
      console.log('not yet implemented')
    }
  }

  const selectFiles = (id: number[]) => {
    setSelectedTorrents([...selectedTorrents, ...id])
  }
  const deselectFiles = (ids: number[]) => {
    setSelectedTorrents(selectedTorrents.filter(id => !ids.includes(id)))
  }
  const isSelected = (id: number) => selectedTorrents.includes(id)

  const onSubmit = () => {}

  return (
    <FilesViewContext.Provider value={{selectFiles, deselectFiles, isSelected, setFilePriorities}}>
      <div className="torrent-files-view">
        <Scrollbar>
          <FileTree tree={fileTree} files={torrent.files} fileStats={torrent.fileStats} />
        </Scrollbar>

        {selectedTorrents.length > 0 &&
          <div className="submission-controls">
            <p><span className="highlight">{selectedTorrents.length}</span> selected files</p>
            <button onClick={() => setSelectedTorrents([])}>Clear Selection</button>
            <SetPriorityComboBox/>
          </div>}
      </div>
    </FilesViewContext.Provider>
  )
}
