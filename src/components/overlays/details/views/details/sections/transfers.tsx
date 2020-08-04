import React, { Fragment, useContext } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTorrentById, torrentPriorityChanged, torrentsUpdated,
  TorrentState, updateTorrent
} from '@puddle/stores'
import { TorrentDetailed, Torrent } from '@puddle/models';
import { scaleBytes } from '@puddle/utils';
import { TransmissionError } from '@puddle/transmission';
import { TableSection, Missing } from '../section';
import { torrentSelector } from '../../../utils';

export function TransferSection() {
  const percentDone = useSelector(torrentSelector(t => t.percentDone))
  const peersConnected = useSelector(torrentSelector(t => t.peersConnected))
  const peerCount = useSelector(torrentSelector(t => Object.keys(t.peers).length))

  return TableSection({
    title: 'Transfer',
    entries: [
      {
        key: 'Downloaded',
        val: `${(percentDone * 100).toFixed(2)}%`
      },
      {
        key: 'Peers',
        val: `${peersConnected} of ${peerCount}`
      }
    ]
  })
}
