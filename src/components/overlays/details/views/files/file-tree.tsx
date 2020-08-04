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
import { safeDivide } from '@puddle/utils';

import '@cstyles/scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

import { FileRow } from './file-row';
import { DirectoryRow } from './dir-row';
import {
  BandwidthPrioritySlider, isPriorityType, ExtendedPriorityType
} from '@puddle/components';

interface FileTreeProps {
  tree: FileTreeEntry
};

export function FileTree(props: FileTreeProps) {
  const entries = Object.entries(props.tree).map(([key, val]) => {
    if (Number.isInteger(val)) {
      return (
        <li key={key}>
          <FileRow name={key} fileId={val} />
        </li>
      );
    } else {
      return (
        <li key={key} className="directory">
          <DirectoryRow name={key} />
          <FileTree {...props} tree={val} />
        </li>
      )
    }
  })

  return <ul className="file-tree">{entries}</ul>;
}
