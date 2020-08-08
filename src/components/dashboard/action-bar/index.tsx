import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TooltipButton from '@puddle/components/tooltip';

import { ClientContext } from '@puddle/components';
import {
  faPlus, faMinus, faPlay, faStop
} from '@fortawesome/free-solid-svg-icons';

import {
  selectSelectedTorrents, removeTorrentOverlayAssigned,
  addTorrentOverlayAssigned
} from '@puddle/stores';

export default function ActionBar() {
  const { transmission } = useContext(ClientContext)
  const dispatch = useDispatch()
  const selectedTorrents = useSelector(selectSelectedTorrents)
      .map(torrent => torrent.id)

  const startTorrents = selectedTorrents.length === 0 ? undefined : () => {
    transmission!.startTorrent(selectedTorrents);
  }

  const stopTorrents = selectedTorrents.length === 0 ? undefined : () => {
    transmission!.stopTorrent(selectedTorrents);
  }

  const removeTorrents = selectedTorrents.length === 0 ? undefined : () => {
    dispatch(removeTorrentOverlayAssigned(selectedTorrents))
  }

  const addTorrents = () => {
    dispatch(addTorrentOverlayAssigned())
  }

  return (
    <header className="dashboard__action-bar">
      <TooltipButton tooltip="Start Torrent" icon={faPlay} onClick={startTorrents} />
      <TooltipButton tooltip="Stop Torrent" icon={faStop} onClick={stopTorrents} />
      <span className="vl" />
      <TooltipButton tooltip="Add Torrent" icon={faPlus} onClick={addTorrents} />
      <TooltipButton tooltip="Remove Torrent" icon={faMinus} onClick={removeTorrents} />
    </header>
  );
}
