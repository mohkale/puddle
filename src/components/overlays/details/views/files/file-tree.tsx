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
import { safeDivide } from '@puddle/utils';

import '@cstyles/scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

import { FilesViewContext } from './context';
import { FileRow } from './file-row';
import { DirectoryRow } from './dir-row';
import {
  BandwidthPrioritySlider, isPriorityType, ExtendedPriorityType
} from '@puddle/components';

interface FileTreeProps {
  tree: FileTreeEntry
  files: TransmissionTorrentFiles[]
  fileStats: TransmissionTorrentFileStats[]
};

export function FileTree(props: FileTreeProps) {
  const entries = Object.entries(props.tree).map(([key, val]) => {
    if (Number.isInteger(val)) {
      const file = props.files[val]
      const wanted = props.fileStats[val].wanted
      const priority: ExtendedPriorityType = wanted ? props.fileStats[val].priority : 'dont-download'
      const percentageComplete = safeDivide(file.bytesCompleted, file.length)

      return (
        <li key={key}>
          <FileRow icon={faFile} name={key} size={file.length} percentageComplete={percentageComplete} fileId={val}
            priority={priority} />
        </li>
      );
    } else {
      return (
        <li key={key} className="directory">
          <DirectoryRow icon={faFolderOpen} name={key} />
          <FileTree {...props} tree={val} />
        </li>
      )
    }
  })

  return <ul className="file-tree">{entries}</ul>;
}
