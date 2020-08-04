import React, { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from '@puddle/components';
import FallbackMessage from '../../fallback';
import { torrentSelector } from '../../utils';

export function TrackersView() {
  const trackers = useSelector(torrentSelector(t => t.trackers))
  const trackerCount = Object.keys(trackers).length
  if (trackerCount === 0) {
    return (
      <FallbackMessage>
        No <span className="highlight">Tracker</span> Information is Available For This Torrent.
      </FallbackMessage>
    );
  }

  const entries = trackers
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
