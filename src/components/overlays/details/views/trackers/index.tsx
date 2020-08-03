import React, { Fragment, useContext } from 'react';
import { TorrentDetailsContext } from '../../context';
import { Badge } from '@puddle/components';
import FallbackMessage from '../../fallback';

export function TrackersView() {
  const { torrent } = useContext(TorrentDetailsContext)
  const trackerCount = Object.keys(torrent.trackers).length
  if (trackerCount === 0) {
    return (
      <FallbackMessage>
        No <span className="highlight">Tracker</span> Information is Available For This Torrent.
      </FallbackMessage>
    );
  }

  const entries = torrent.trackers
    .map(tracker => {
      const protocol = (new URL(tracker.announce)).protocol.slice(0, -1)

      return (
        <tr key={tracker.id}>
          <td>{tracker.announce}</td>
          <td>{protocol}</td>
        </tr>
      );
    })

  return (
    <table className="torrent-trackers-table">
      <thead>
        <tr>
          <td>Trackers <Badge num={trackerCount}/></td>
          <td>Type</td>
        </tr>
      </thead>
      <tbody>
        {entries}
      </tbody>
    </table>
  )
}
