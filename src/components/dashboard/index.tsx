import React, { useState } from 'react';

import './styles';
import TorrentList from './torrent-list';
import ActionButtons from './action-buttons';

import { TorrentId } from '@puddle/transmission';

export default function Dashboard() {
  const [selected, setSelected] = useState<TorrentId[]>([])

  return (
    <main id="dashboard">
      <ActionButtons />
      <TorrentList />
    </main>
  )
}
