import React, { Fragment, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTorrentById, torrentPriorityChanged, TorrentState, updateTorrent,
  selectTorrentDetailsOverlayTorrent
} from '@puddle/stores'
import { Torrent } from '@puddle/models';
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
import { RootState } from '@puddle/stores';
import { torrentSelector } from '../utils';

export default function Header(props: { torrentId: number }) {
  const name = useSelector(torrentSelector(t => t.name))
  const progress = useSelector(torrentSelector(t => t.progress))
  const classes = useSelector(torrentSelector(t => t.classes))
  const torrent = useSelector(selectTorrentDetailsOverlayTorrent)!
  const className = torrentClasses(torrent, false)

  return (
    <header className={className}>
      <h1>{name}</h1>

      <div className="control-bar">
        <TorrentProperties />
        <TorrentControls />
      </div>

      <ProgressBar progress={progress * 100} classes={classes} />
    </header>
  )
}
