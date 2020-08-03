import React, { Fragment, useContext, useState } from 'react';
import { TorrentDetailsContext } from '../../context';
import { Badge } from '@puddle/components';
import { TorrentFull } from '../../torrent-full';
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


export interface DirectoryRowProps {
  icon: IconDefinition
  name: string
}

export function DirectoryRow(props: DirectoryRowProps) {
  return (
    <div className="file">
      <FontAwesomeIcon icon={props.icon} className="icon" />
      <span className="name">{props.name}</span>
    </div>
  )
}
