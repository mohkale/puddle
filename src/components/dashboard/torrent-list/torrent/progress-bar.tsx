import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamation, faPlay, faStop
} from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import { TorrentClasses } from '@puddle/models';

class TorrentStatusIcon extends React.PureComponent<{ status: number }> {
  render() {
    return <FontAwesomeIcon className="icon" icon={this.icon}/>
  }

  private get icon() {
    const status = this.props.status
    if ((status & TorrentClasses.ERROR) !== 0) {
      return faExclamation
    } else if ((status & TorrentClasses.STOPPED) !== 0) {
      return faStop
    } else if ((status & TorrentClasses.ACTIVE) !== 0) {
      return faPlay
    } else {
      return faCircle
    }
  }
}

interface ProgressBarProps {
  /** How much of our download has been completed, between 0 and 100. */
  progress: number,

  /** The current classes of the torrent, used to infer an appropriate icon. */
  classes: number,
}

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <TorrentStatusIcon status={props.classes} />

      <div className="fill">
        <div className="progress" style={{width: `${props.progress}%`}}></div>
      </div>
    </div>
  )
}
