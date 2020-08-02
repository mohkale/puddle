import React from 'react';

import '@cstyles/dashboard';
import TorrentList from './torrent-list';
import ActionButtons from './action-buttons';

export default function Dashboard() {
  return (
    <main id="dashboard">
      <ActionButtons />
      <TorrentList />
    </main>
  )
}
