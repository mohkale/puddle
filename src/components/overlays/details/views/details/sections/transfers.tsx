import React, { Fragment, useContext } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTorrentById, torrentPriorityChanged, torrentsUpdated,
  TorrentState, updateTorrent
} from '@puddle/stores'
import { TorrentDetailsContext } from '../../../context';
import { TorrentDetailed, Torrent } from '@puddle/models';
import { scaleBytes } from '@puddle/utils';
import { TransmissionError } from '@puddle/transmission';
import { TableSection, Missing } from '../section';

type TranferSectionProps =
  { peerCount: number } &
  Pick<TorrentDetailed, 'percentDone' | 'peersConnected'>

export const TransferSection = React.memo<TranferSectionProps>((props) => {
  return TableSection({
    title: 'Transfer',
    entries: [
      {
        key: 'Downloaded',
        val: `${(props.percentDone * 100).toFixed(2)}%`
      },
      {
        key: 'Peers',
        val: `${props.peersConnected} of ${props.peerCount}`
      }
    ]
  })
})

