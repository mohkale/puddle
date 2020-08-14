import React from 'react';
import { useSelector } from 'react-redux';

import { torrentSelector } from '../../../utils';
import { TableSection, Missing, formatDate } from '../section';
import { TransmissionTorrentStatus as TorrentState } from '@transmission';

export function formatTorrentState(state: TorrentState) {
  switch (state) {
    case TorrentState.STOPPED:
      return 'Stopped'
    case TorrentState.CHECK_WAIT:
    case TorrentState.DOWNLOAD_WAIT:
    case TorrentState.SEED_WAIT:
      return 'Queued'
    case TorrentState.CHECK:
      return 'Checking'
    case TorrentState.DOWNLOAD:
      return 'Downloading'
    case TorrentState.SEED:
      return 'Seeding'
  }
}

export function GeneralSection() {
  const addedDate = useSelector(torrentSelector(t => t.addedDate));
  const downloadDir = useSelector(torrentSelector(t => t.downloadDir));
  const labels = useSelector(torrentSelector(t => t.labels));
  const state = useSelector(torrentSelector(t => t.status))

  const tags = labels.length === 0 ? (<Missing/>) : (
    <ul className="tags inline-list">
      {labels.map(label => <li key={label}>{label}</li>)}
    </ul>
  )

  return TableSection({
    title: 'General',
    entries: [
      {
        key: 'Added',
        val: formatDate(addedDate)
      },
      {
        key: 'Location',
        val: downloadDir,
      },
      {
        key: 'Tags',
        val: tags
      },
      {
        key: 'State',
        val: formatTorrentState(state)
      },
    ]
  })
}
