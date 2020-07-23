import React from 'react';

import TorrentResponse, {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission/responses/torrent';
import { TorrentId } from '@puddle/transmission';

import TorrentColumns, {
  MINIMUM_WIDTH as MINIMUM_COLUMN_WIDTH
} from '@puddle/components/columns';

/**
 * Associates each row in the torrent list with a class representing
 * its current status.
 */
const torrentStatusClass: { [key in TorrentStatus]: string } = {
  [TorrentStatus.STOPPED]:       'paused',
  [TorrentStatus.CHECK_WAIT]:    'waiting',
  [TorrentStatus.DOWNLOAD_WAIT]: 'waiting',
  [TorrentStatus.SEED_WAIT]:     'waiting',
  [TorrentStatus.CHECK]:         'checking',
  [TorrentStatus.DOWNLOAD]:      'downloading',
  [TorrentStatus.SEED]:          'seeding'
}

interface TorrentListProps {
  torrents: Partial<TorrentResponse>[],
  selectedTorrents: TorrentId[],
  selectTorrent: (i: number) => void,
  columns: TorrentColumns
}

export default function TorrentList(props: TorrentListProps) {
  return (
    <ul className="rows">
      {props.torrents.map((torrent, i) => {
        const selected = props.selectedTorrents.includes(torrent.id!)
        const classes = [
          torrentStatusClass[torrent.status!],
          selected ? 'active' : ''
        ].join(' ')

        return (
          <li key={torrent.id!} className={classes}
              onClick={(e) => props.selectTorrent(i)} >
            {props.columns.activeColumns.map(col => {
              const cellClasses = ["table-cell", col.title].join(' ')

              return (
                <div className={cellClasses} key={col.key}
                     style={{width: col.width}} >
                  <div>{col.action(torrent)}</div>
                </div>
              )
            })}
          </li>
        )})}
      </ul>
  )
}
