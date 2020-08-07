import React from 'react';

import '@cstyles/dashboard';
import ActionBar from './action-bar';
import TorrentList from './torrent-list';

export default function Dashboard() {
  return (
    <main id="dashboard">
      <ActionBar />
      <TorrentList />
    </main>
  )
}
