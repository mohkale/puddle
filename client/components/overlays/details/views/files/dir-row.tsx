import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import { Checkbox } from '@client/components';

import {
  torrentDetailsOverlaySelectDirectory,
  torrentDetailsOverlayDeselectDirectory,
  selectTorrentDetailsOverlayIsDirectorySelected
} from '@client/stores';

export interface DirectoryRowProps {
  name: string
  path: string
}

export function DirectoryRow(props: DirectoryRowProps) {
  const dispatch = useDispatch()
  const isSelected = useSelector(selectTorrentDetailsOverlayIsDirectorySelected(props.path))
  const toggleDirectory = (val: boolean) => {
    const toggleDispatcher = val ?
      torrentDetailsOverlaySelectDirectory : torrentDetailsOverlayDeselectDirectory
    dispatch(toggleDispatcher(props.path))
  }

  return (
    <div className="file-tree__file">
      <Checkbox isChecked={isSelected} onCheck={toggleDirectory}
                fallback={() => <FontAwesomeIcon icon={faFolderOpen} className="icon" />}/>
      <span className="name">{props.name}</span>
    </div>
  )
}
