import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { faFile } from '@client/utils/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  selectTorrentDetailsOverlayFileProps,
  torrentDetailsOverlaySelectFiles,
  torrentDetailsOverlayDeselectFiles,
  setFilePriorities
} from '@client/stores';

import {
  BandwidthPrioritySlider, ExtendedPriorityType,
  Checkbox, ClientContext, BytesWithUnit
} from '@client/components';

interface FileRowProps {
  path: string
  name: string
  fileId: number
}

export function FileRow(props: FileRowProps) {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const file = useSelector(selectTorrentDetailsOverlayFileProps(props.fileId))

  const toggleFile = () => {
    const toggleDispatcher = file.isSelected ?
      torrentDetailsOverlayDeselectFiles : torrentDetailsOverlaySelectFiles
    dispatch(toggleDispatcher({ id: props.fileId, path: props.path }))
  }

  const setPriority = (p: ExtendedPriorityType) => {
    dispatch(setFilePriorities(transmission, [props.fileId], p))
  }

  return (
    <div className="file-tree__file">
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
