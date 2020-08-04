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

export function TransferMeasure(props: {
  rate: number, total: number, icon: IconDefinition
} & React.HTMLProps<HTMLLIElement>) {
  const [rate, rateUnit] = scaleBytes(props.rate)
  const [total, totalUnit] = scaleBytes(props.total)

  return (
    <li className={[rate !== 0 ? 'active' : '', props.className].join(' ')}>
      <FontAwesomeIcon icon={props.icon} className="icon" />
      {rate.toFixed(2)}<span className="unit">{rateUnit}/s</span>
      {' — '}
      {total.toFixed(2)}<span className="unit">{totalUnit}</span>
    </li>
  )
}

