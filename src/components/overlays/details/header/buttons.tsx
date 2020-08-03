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

interface StartStopButtonProps {
  torrentId: number
  status: TorrentStatus
}

/**
 * Component hoisting two buttons to indicate whether the current torrent
 * is paused or running and lets you click on it to toggle these possible
 * states.
 */
export const StartStopButtons = React.memo<StartStopButtonProps>((props) => {
  const { transmission } = useContext(ClientContext)
  const { updateTorrent } = useContext(TorrentDetailsContext)
  let stopped = props.status === TorrentStatus.STOPPED

  const startStopPress =
    (predicate: boolean,
     invoke: (id: number) => Promise<Torrent>,
     newState: TorrentStatus) => {
      return () => {
        if (predicate) {
          invoke(props.torrentId)
            .then(resp => {
              updateTorrent({ status: newState })
            })
        }
      }
    }

  // WARN we don't know for sure the started torrent will be downloading, we just
  // set the state to downloading so the start/stop buttons in the ui are updated.
  // the next update cycle we should get a refresh which assigns the proper status
  // anyways
  const onStartButtonPress = startStopPress(stopped, transmission.startTorrent, TorrentStatus.DOWNLOAD_WAIT)
  const onStopButtonPress = startStopPress(!stopped, transmission.stopTorrent, TorrentStatus.STOPPED)

  return (
    <Fragment>
      <li className={['button', stopped ? '' : 'active'].join(' ')}
          onClick={onStartButtonPress}>
        <FontAwesomeIcon icon={faPlay} className="icon" />
        Start
      </li>

      <li className={['button', stopped ? 'active' : ''].join(' ')}
          onClick={onStopButtonPress}>
        <FontAwesomeIcon icon={faStop} className="icon" />
        Stop
      </li>
    </Fragment>
  )
})