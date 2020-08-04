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
import { StartStopButtons } from './buttons';

export function TorrentControls(props: { torrent: Torrent }) {
  const { transmission } = useContext(ClientContext)
  const { updateTorrent } = useContext(TorrentDetailsContext)
  const updatePriority = (p: ExtendedPriorityType) => {
    if (isPriorityType(p)) {
      transmission.setTorrent(props.torrent.id, {
        bandwidthPriority: p
      }).then(() => updateTorrent({ bandwidthPriority: p }))
    }
  }

  return (
    <ul className="torrent-controls">
      <li>
        <BandwidthPrioritySlider
          priority={props.torrent.bandwidthPriority}
          attachLabel={true} setPriority={updatePriority} />
      </li>

      <StartStopButtons
         torrentId={props.torrent.id}
         status={props.torrent.status} />
    </ul>
  )
}

