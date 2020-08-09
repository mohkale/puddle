import React from 'react';
import { useSelector } from 'react-redux';
import { selectTorrentDetailsOverlayTorrent } from '@client/stores'

import { torrentClasses } from '@client/components/dashboard/torrent-list/torrent';
import ProgressBar from '@client/components/dashboard/torrent-list/torrent/progress-bar'

import { TorrentProperties } from './properties';
import { TorrentControls } from './controls';
import { torrentSelector } from '../utils';

export default function Header() {
  const name = useSelector(torrentSelector(t => t.name))
  const progress = useSelector(torrentSelector(t => t.progress))
  const classes = useSelector(torrentSelector(t => t.classes))
  const torrent = useSelector(selectTorrentDetailsOverlayTorrent)!
  const className = torrentClasses(torrent, false)

  return (
    <header className={className}>
      <h1>{name}</h1>

      <div className="torrent-details__bar">
        <TorrentProperties />
        <TorrentControls />
      </div>

      <ProgressBar progress={progress * 100} classes={classes} />
    </header>
  )
}
