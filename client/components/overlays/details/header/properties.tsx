import React from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faLongArrowAltDown, faLongArrowAltUp, faTachometerAlt, faClock
} from '@fortawesome/free-solid-svg-icons';

import { TransferMeasure } from './transfers';
import { torrentSelector } from '../utils';
import { formatDuration } from '@client/utils';

export function TorrentProperties() {
  const downloadRate = useSelector(torrentSelector(t => t.rateDownload))
  const downloadedEver = useSelector(torrentSelector(t => t.downloadedEver))
  const uploadRate = useSelector(torrentSelector(t => t.rateUpload))
  const uploadedEver = useSelector(torrentSelector(t => t.uploadedEver))
  const uploadRatio = useSelector(torrentSelector(t => t.uploadRatio))
  const eta = useSelector(torrentSelector(t => t.eta))

  return (
    <ul>
      <TransferMeasure icon={faLongArrowAltDown}
                       className="torrent-details__bar-transfers--download"
                       rate={downloadRate} total={downloadedEver} />
      <TransferMeasure icon={faLongArrowAltUp}
                       className="torrent-details__bar-transfers--upload"
                       rate={uploadRate} total={uploadedEver} />

      <li>
        <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
        {uploadRatio > 0 && uploadRatio}
      </li>

      <li>
        <FontAwesomeIcon icon={faClock} className="icon" />
        {eta > 0 &&
          formatDuration(eta * 1000)}
      </li>
    </ul>
  )
}
