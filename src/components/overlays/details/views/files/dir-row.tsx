import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

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
