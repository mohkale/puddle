import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectSelectedTorrents } from '@puddle/stores';
import TooltipButton from '@puddle/components/tooltip';

import {
  faPlus, faMinus, faPlay, faStop
} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import AppContext from '@puddle/components/app-context';

export default function ActionButtons() {
  const { transmission } = useContext(AppContext)
  const selectedTorrents = useSelector(selectSelectedTorrents)
      .map(torrent => torrent.id)

  const startTorrents = () => {
    if (transmission && selectedTorrents.length > 0) {
      transmission!.startTorrent(selectedTorrents);
    }
  }

  const stopTorrents = () => {
    if (transmission && selectedTorrents.length > 0) {
      transmission!.stopTorrent(selectedTorrents);
    }
  }

  return (
    <header>
      <TooltipButton tooltip="Start Torrent" icon={faPlay} onClick={startTorrents} />
      <TooltipButton tooltip="Stop Torrent" icon={faStop} onClick={stopTorrents} />
      <span className="vl" />
      <TooltipButton tooltip="Add Torrent" icon={faPlus} />
      <TooltipButton tooltip="Remove Torrent" icon={faMinus} />
    </header>
  );
}
