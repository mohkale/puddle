import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@puddle/stores';
import TooltipButton from '@puddle/components/tooltip';

import {
  faPlus, faMinus, faPlay, faStop
} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import AppContext from '@puddle/components/app-context';

export default function Header() {
  const selectedTorrents = useSelector((state: RootState) =>
    Object.values(state.torrents.torrentEntries)
      .filter(torrent => torrent.selected))
      .map(torrent => torrent.id)

  return (
    <AppContext.Consumer>
      {({ transmission }) => {
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
      }}
    </AppContext.Consumer>
  );
}
