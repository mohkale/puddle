import React, { Fragment, useContext, useState } from 'react';
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


export interface DirectoryRowProps {
  name: string
}

export function DirectoryRow(props: DirectoryRowProps) {
  return (
    <div className="file">
      <FontAwesomeIcon icon={faFolderOpen} className="icon" />
      <span className="name">{props.name}</span>
    </div>
  )
}
