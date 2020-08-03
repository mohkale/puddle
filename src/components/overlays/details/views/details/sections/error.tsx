import React, { Fragment, useContext } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { selectTorrentById, torrentPriorityChanged, torrentsUpdated, TorrentState, updateTorrent, Torrent } from '@puddle/stores'
import { TorrentDetailsContext } from '../../../context';
import { TorrentFull } from '../../../torrent-full';
import { scaleBytes } from '@puddle/utils';
import { TransmissionError } from '@puddle/transmission';
import { TableSection } from '../section';

type ErrorSectionProps =
  Pick<TorrentFull, 'error' | 'errorString'>

const ERROR_TYPES: { [key in TransmissionError]: string } = {
  [TransmissionError.OK]: 'OK',
  [TransmissionError.TRACKER_WARNING]: 'Tracker Warning',
  [TransmissionError.TRACKER_ERROR]: 'Tracker Error',
  [TransmissionError.LOCAL_ERROR]: 'Local Error',
}

export const ErrorSection = React.memo<ErrorSectionProps>((props) =>  {
  if (props.error === 0)
    return null

  return TableSection({
    title: 'Error',
    entries: [
      {
        key: 'Kind',
        val: `(${props.error}) ${ERROR_TYPES[props.error]}`
      },
      {
        key: 'message',
        val: props.errorString
      }
    ]
  })
})
