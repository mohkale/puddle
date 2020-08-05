import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { faFile } from '@puddle/utils/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  selectTorrentDetailsOverlayFileProps,
  torrentDetailsOverlaySelectFiles,
  torrentDetailsOverlayDeselectFiles,
  setFilePriorities
} from '@puddle/stores';

import {
  BandwidthPrioritySlider, ExtendedPriorityType,
  Checkbox, ClientContext, BytesWithUnit
} from '@puddle/components';

import { DirectoryRowProps } from './dir-row';


interface FileRowProps extends DirectoryRowProps {
  fileId: number
}

export function FileRow(props: FileRowProps) {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const file = useSelector(selectTorrentDetailsOverlayFileProps(props.fileId))

  const toggleFile = () => {
    const toggleDispatcher = file.isSelected ?
      torrentDetailsOverlayDeselectFiles : torrentDetailsOverlaySelectFiles
    dispatch(toggleDispatcher([props.fileId]))
  }

  const setPriority = (p: ExtendedPriorityType) => {
    dispatch(setFilePriorities(transmission, [props.fileId], p))
  }

  return (
    <div className="file">
      <Checkbox isChecked={file.isSelected} onCheck={toggleFile}
                fallback={() => <FontAwesomeIcon icon={faFile} className="icon" />}/>
      <span className="name">{props.name}</span>

      <span className="percentage">
        {(file.percentageComplete * 100).toFixed()}%
      </span>

      <span className="size">
        <BytesWithUnit bytes={file.size} />
      </span>

      <BandwidthPrioritySlider priority={file.priority} setPriority={setPriority} canNotDownload={true} />
    </div>
  )
}
