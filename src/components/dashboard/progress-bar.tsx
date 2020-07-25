import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

import {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission/responses/torrent';

class TorrentStatusIcon extends React.PureComponent<{ status: TorrentStatus }> {
  render() {
    let icon;
    switch (this.props.status) {
      case TorrentStatus.STOPPED:
      case TorrentStatus.CHECK_WAIT:
      case TorrentStatus.SEED_WAIT:
      case TorrentStatus.DOWNLOAD_WAIT:
      case TorrentStatus.CHECK:
      case TorrentStatus.DOWNLOAD:
      case TorrentStatus.SEED:
        icon = faExclamation
        break
    }

    return <FontAwesomeIcon className="icon" icon={icon}/>
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
