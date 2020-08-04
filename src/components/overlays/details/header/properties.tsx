import React, { Fragment, useContext, useState } from 'react';
import { TorrentDetailsContext } from '../context';
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

export function TorrentProperties(props: { torrent: Torrent }) {
  const torrent = props.torrent;

  return (
    <ul className="torrent-props">
      <TransferMeasure icon={faLongArrowAltDown} className="download"
                       rate={torrent.rateDownload} total={torrent.downloadedEver} />
      <TransferMeasure icon={faLongArrowAltUp} className="upload"
                       rate={torrent.rateUpload} total={torrent.uploadedEver} />

      <li>
        <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
        {torrent.uploadRatio > 0 &&
          torrent.uploadRatio}
      </li>

      <li>
        <FontAwesomeIcon icon={faClock} className="icon" />
        {torrent.doneDate.toFixed(2)}
      </li>
    </ul>
  )
}
