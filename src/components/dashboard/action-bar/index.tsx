import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedTorrents } from '@puddle/stores';
import TooltipButton from '@puddle/components/tooltip';

import { ClientContext } from '@puddle/components';
import {
  faPlus, faMinus, faPlay, faStop
} from '@fortawesome/free-solid-svg-icons';

export default function ActionBar() {
  const { transmission } = useContext(ClientContext)
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
    <header className="dashboard__action-bar">
      <TooltipButton tooltip="Start Torrent" icon={faPlay} onClick={startTorrents} />
      <TooltipButton tooltip="Stop Torrent" icon={faStop} onClick={stopTorrents} />
      <span className="vl" />
      <TooltipButton tooltip="Add Torrent" icon={faPlus} />
      <TooltipButton tooltip="Remove Torrent" icon={faMinus} />
    </header>
  );
}
