import React, { Fragment, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from '@puddle/components';
import { TorrentDetailed } from '@puddle/models';
import { constructFileTree, FileTreeEntry, scaleBytes } from '@puddle/utils';
import { ClientContext } from '@puddle/components';
import { TransmissionTorrentFiles, TransmissionTorrentFileStats } from '@puddle/transmission';
import {
  selectTorrentDetailsOverlayFileProps,
  torrentDetailsOverlaySelectFiles,
  torrentDetailsOverlayDeselectFiles,
  setFilePriorities
} from '@puddle/stores';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@puddle/utils/fontawesome';
import { Checkbox } from '@puddle/components';

import '@cstyles/scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

import { DirectoryRow, DirectoryRowProps } from './dir-row';
import {
  BandwidthPrioritySlider, isPriorityType, ExtendedPriorityType
} from '@puddle/components';

interface FileRowProps extends DirectoryRowProps {
  fileId: number
}

export function FileRow(props: FileRowProps) {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const file = useSelector(selectTorrentDetailsOverlayFileProps(props.fileId))
  const [size, sizeUnit] = scaleBytes(file.size);

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
      <span className="percentage">{(file.percentageComplete * 100).toFixed()}%</span>
      <span className="size">{size.toFixed(2)}<em className="unit">{sizeUnit}</em></span>
      <BandwidthPrioritySlider priority={file.priority} setPriority={setPriority} canNotDownload={true} />
    </div>
  )
}
