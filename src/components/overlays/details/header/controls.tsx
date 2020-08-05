import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectTorrentDetailsOverlayTorrentId,
  torrentDetailsOverlayTorrentAssigned
} from '@puddle/stores'

import {
  ClientContext, BandwidthPrioritySlider, isPriorityType,
  ExtendedPriorityType
} from '@puddle/components';

import { StartStopButtons } from './buttons';
import { torrentSelector } from '../utils';

export function TorrentControls() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const priority = useSelector(torrentSelector(t => t.bandwidthPriority))
  const id = useSelector(selectTorrentDetailsOverlayTorrentId)

  const updatePriority = (p: ExtendedPriorityType) => {
    if (isPriorityType(p)) {
      transmission.setTorrent(id, { bandwidthPriority: p })
        .then(() => dispatch(torrentDetailsOverlayTorrentAssigned(
          { bandwidthPriority: p })))
    }
  }

  return (
    <ul className="torrent-controls">
      <li>
        <BandwidthPrioritySlider
          attachLabel={true}
          priority={priority}
          setPriority={updatePriority} />
      </li>

      <StartStopButtons />
    </ul>
  )
}
