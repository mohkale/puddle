import React, { Fragment, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Torrent } from '@client/models'
import {
  selectTorrentDetailsOverlayTorrentId,
  torrentDetailsOverlayTorrentAssigned
} from '@client/stores'
import { TransmissionTorrentStatus as TorrentStatus } from '@transmission';

import { torrentSelector } from '../utils';
import { ClientContext } from '@client/components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

/**
 * Component hoisting two buttons to indicate whether the current torrent
 * is paused or running and lets you click on it to toggle these possible
 * states.
 */
export const StartStopButtons = () => {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const torrentId = useSelector(selectTorrentDetailsOverlayTorrentId)
  const status = useSelector(torrentSelector(t => t.status))
  const stopped = status === TorrentStatus.STOPPED

  const startStopPress =
    (predicate: boolean, invoke: (id: number) => Promise<Torrent>, newState: TorrentStatus) => {
      return () => {
        if (predicate) {
          invoke(torrentId)
            .then(() => {
              dispatch(torrentDetailsOverlayTorrentAssigned({ status: newState }))
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

  const activeClass = 'torrent-details__bar-button--active';

  return (
    <Fragment>
      <li className={['torrent-details__bar-button', !stopped && activeClass].join(' ')}
          onClick={onStartButtonPress}>
        <FontAwesomeIcon icon={faPlay} className="icon" />
        Start
      </li>

      <li className={['torrent-details__bar-button', stopped && activeClass].join(' ')}
          onClick={onStopButtonPress}>
        <FontAwesomeIcon icon={faStop} className="icon" />
        Stop
      </li>
    </Fragment>
  )
}
