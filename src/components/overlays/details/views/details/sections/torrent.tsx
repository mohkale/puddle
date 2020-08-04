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
import { TableSection, Missing, formatDate } from '../section';

type TorrentSectionProps =
  Pick<TorrentDetailed, 'dateCreated' | 'hashString' | 'totalSize' | 'creator' | 'comment' |
    'isPrivate'>

export const TorrentSection = React.memo<TorrentSectionProps>((props) => {
  const [size, sizeUnit] = scaleBytes(props.totalSize)

  return TableSection({
    title: 'Torrent',
    entries: [
      {
        key: 'Creator',
        val: props.creator === '' ? (<Missing>Unknown</Missing>) : props.creator,
      },
      {
        key: 'Creation Date',
        val: formatDate(props.dateCreated)
      },
      {
        key: 'Hash',
        val: props.hashString
      },
      {
        key: 'Size',
        val: `${size.toFixed(2)}${sizeUnit}`
      },
      {
        key: 'Comment',
        val: props.comment === '' ? (<Missing />) : props.comment,
      },
      {
        key: 'Type',
        val: props.isPrivate ? 'Private' : 'Public'
      }
    ]
  })
})
