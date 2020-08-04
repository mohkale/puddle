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
import { TableSection } from '../section';
import { torrentSelector } from '../../../utils';

const ERROR_TYPES: { [key in TransmissionError]: string } = {
  [TransmissionError.OK]: 'OK',
  [TransmissionError.TRACKER_WARNING]: 'Tracker Warning',
  [TransmissionError.TRACKER_ERROR]: 'Tracker Error',
  [TransmissionError.LOCAL_ERROR]: 'Local Error',
}

export function ErrorSection() {
  const error = useSelector(torrentSelector(t => t.error))
  const errorString = useSelector(torrentSelector(t => t.errorString))

  if (error === 0)
    return null

  return TableSection({
    title: 'Error',
    entries: [
      {
        key: 'Kind',
        val: `(${error}) ${ERROR_TYPES[error]}`
      },
      {
        key: 'message',
        val: errorString
      }
    ]
  })
}
