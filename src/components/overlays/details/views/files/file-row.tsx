import React, { Fragment, useContext, useState } from 'react';
import { TorrentDetailsContext } from '../../context';
import { Badge } from '@puddle/components';
import { TorrentFull } from '@puddle/stores';
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
import { DirectoryRow, DirectoryRowProps } from './dir-row';
import {
  BandwidthPrioritySlider, isPriorityType, ExtendedPriorityType
} from '@puddle/components';

interface FileRowProps extends DirectoryRowProps {
  fileId: number
  size: number
  percentageComplete: number
  priority: ExtendedPriorityType
}

export function FileRow(props: FileRowProps) {
  const { selectFiles, deselectFiles, isSelected, setFilePriorities } = useContext(FilesViewContext)
  const [size, sizeUnit] = scaleBytes(props.size);
  const selected = isSelected(props.fileId)

  const toggleFile = () =>
    (selected ? deselectFiles : selectFiles)([props.fileId])

  const setPriority = (p: ExtendedPriorityType) => {
    setFilePriorities([props.fileId], p)
  }

  return (
    <div className="file">
      <Checkbox isChecked={selected} onCheck={toggleFile}  fallback={() => <FontAwesomeIcon icon={props.icon} className="icon" />}/>
      <span className="name">{props.name}</span>
      <span className="percentage">{(props.percentageComplete * 100).toFixed()}%</span>
      <span className="size">{size.toFixed(2)}<em className="unit">{sizeUnit}</em></span>
      <BandwidthPrioritySlider priority={props.priority} setPriority={setPriority} />
    </div>
  )
}
