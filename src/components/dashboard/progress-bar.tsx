import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faPlay, faStop, faPause } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import {
  PuddleTorrentStates as TorrentStatus
} from '@puddle/utils/filters/status';

class TorrentStatusIcon extends React.PureComponent<{ status: TorrentStatus }> {
  render() {
    return <FontAwesomeIcon className="icon" icon={this.icon}/>
  }

  private get icon() {
    const status = this.props.status
    if ((status & TorrentStatus.ERROR) !== 0) {
      return faExclamation
    } else if ((status & TorrentStatus.STOPPED) !== 0) {
      return faStop
    } else if ((status & TorrentStatus.ACTIVE) !== 0) {
      return faPlay
    } else {
      return faCircle
    }
  }
}

interface ProgressBarProps {
  /** How much of our download has been completed, between 0 and 100. */
  progress: number,

  /** The current status of the download, used to infer an appropriate icon. */
  status: TorrentStatus,
}

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <TorrentStatusIcon status={props.status} />

      <div className="fill">
        <div className="progress" style={{width: `${props.progress}%`}}></div>
      </div>
    </div>
  )
}
