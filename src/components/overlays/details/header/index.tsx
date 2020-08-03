import React, { Fragment, useContext, useState } from 'react';
import { TorrentDetailsContext } from '../context';
import { useSelector, useDispatch } from 'react-redux';
import { selectTorrentById, torrentPriorityChanged, TorrentState, updateTorrent, Torrent } from '@puddle/stores'
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

import { TorrentProperties } from './properties';
import { TorrentControls } from './controls';

export default function Header(props: { torrentId: number }) {
  const { torrent } = useContext(TorrentDetailsContext)
  const classes = torrentClasses(torrent, false)

  return (
    <header className={`${classes}`}>
      <h1>{torrent.name}</h1>

      <div className="control-bar">
        <TorrentProperties torrent={torrent} />
        <TorrentControls torrent={torrent} />
      </div>

      <ProgressBar progress={torrent.progress * 100} classes={torrent.classes} />
    </header>
  )
}
