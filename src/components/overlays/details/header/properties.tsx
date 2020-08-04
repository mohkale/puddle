import React, { Fragment, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTorrentById, torrentPriorityChanged, TorrentState,
  updateTorrent
} from '@puddle/stores'
import { Torrent } from '@puddle/models'
import ProgressBar from '@puddle/components/dashboard/torrent-list/torrent/progress-bar'
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClientContext } from '@puddle/components';
import {
  TransmissionTorrentStatus as TorrentStatus,
  TransmissionPriorityType as PriorityType
} from '@puddle/transmission';
import {
  faLongArrowAltDown, faLongArrowAltUp, faPlay, faStop
} from '@fortawesome/free-solid-svg-icons';

import {
  faTachometerAlt, faClock
} from '@fortawesome/free-solid-svg-icons';

import {
  scaleBytes, timeFormat, padString
} from '@puddle/utils';

import { torrentClasses } from '@puddle/components/dashboard/torrent-list/torrent';
import { BandwidthPrioritySlider, isPriorityType, ExtendedPriorityType } from '@puddle/components';
import { TransferMeasure } from './transfers';
import { torrentSelector } from '../utils';

export function TorrentProperties() {
  const downloadRate = useSelector(torrentSelector(t => t.rateDownload))
  const downloadedEver = useSelector(torrentSelector(t => t.downloadedEver))
  const uploadRate = useSelector(torrentSelector(t => t.rateUpload))
  const uploadedEver = useSelector(torrentSelector(t => t.uploadedEver))
  const uploadRatio = useSelector(torrentSelector(t => t.uploadRatio))
  const eta = useSelector(torrentSelector(t => t.eta))

  return (
    <ul className="torrent-props">
      <TransferMeasure icon={faLongArrowAltDown} className="download"
                       rate={downloadRate} total={downloadedEver} />
      <TransferMeasure icon={faLongArrowAltUp} className="upload"
                       rate={uploadRate} total={uploadedEver} />

      <li>
        <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
        {uploadRatio > 0 && uploadRatio}
      </li>

      <li>
        <FontAwesomeIcon icon={faClock} className="icon" />
        {eta > 0 && eta.toFixed(2)}
      </li>
    </ul>
  )
}
