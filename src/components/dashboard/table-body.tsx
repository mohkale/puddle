import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Torrent, selected as torrentSelected, TorrentState
} from '@puddle/stores/torrent';
import { RootState } from '@puddle/stores';
import { ColumnState, Column, ColumnType } from '@puddle/stores/columns';
import TorrentResponse, {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission/responses/torrent';
// import { TorrentId } from '@puddle/transmission';

import {
  scaleBytes, timeFormat, padString
} from '@puddle/utils';
import ProgressBar from './progress-bar';

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

// TODO maybe convert to a Pure component?
function renderColumn(cType: ColumnType, torrent: Torrent): React.ReactNode {
  switch (cType) {
    case ColumnType.NAME:
      return torrent.name
    case ColumnType.PROGRESS:
      const downloaded = (torrent.haveValid + torrent.haveUnchecked)
      const complete = 100 * (downloaded / torrent.sizeWhenDone) || 0
      return <ProgressBar progress={complete} status={torrent.status} />;
    case ColumnType.DOWNLOADED: {
      const [num, unit] = scaleBytes(torrent.downloadedEver!)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B</em> </span>
      )
    }
    case ColumnType.DOWNLOAD_SPEED: {
      const [num, unit] = scaleBytes(torrent.rateDownload)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B/s</em> </span>
      )
    }
    case ColumnType.UPLOADED: {
      const [num, unit] = scaleBytes(torrent.uploadedEver)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B</em> </span>
      )
    }
    case ColumnType.UPLOAD_SPEED: {
      const [num, unit] = scaleBytes(torrent.rateUpload)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B/s</em> </span>
      )
    }
    case ColumnType.ETA:
      if (torrent.eta <= -1 || torrent.status !== TorrentStatus.DOWNLOAD) {
        return ""
      }

      return timeFormat(torrent.eta)
    case ColumnType.RATIO:
       return (torrent.uploadRatio >= 0) ? torrent.uploadRatio.toFixed(2) : ''
    case ColumnType.FILE_SIZE: {
      const [num, unit] = scaleBytes(torrent.sizeWhenDone)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B</em> </span>
      )
    }
    case ColumnType.ADDED:
      const d = new Date(torrent.addedDate * 1000),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDay();

      // NOTE maybe include hour.minute.second?
      return `${d.getFullYear()}.${padString(month.toString(), 2)}.${padString(day.toString(), 2)}`
    default:
      return torrent.name
  }
}

export default function TableBody() {
  const dispatch = useDispatch()
  const torrents: TorrentState = useSelector((state: RootState) => state.torrents)
  const columnsState: ColumnState = useSelector((state: RootState) => state.columns)

  const items = torrents.torrents
    .map(id => torrents.torrentEntries[id])
    .map(torrent => {
      const columns: [ColumnType, Column][] = columnsState.columnOrder
        .map(cType => [cType, columnsState.columns[cType]])
      const classes = [
        torrentStatusClass[torrent.status],
        torrents.selectedTorrents.includes(torrent.id) ? 'active' : ''
      ].join(' ')

      const cells = columns.map(([cType, col]) => {
        const cellClasses = ["table-cell", col.title].join(' ')

        return (
          <div className={cellClasses} key={col.title}
               style={{width: col.width}} >
            <div>{renderColumn(cType, torrent)}</div>
          </div>
        )
      })

      return <li key={torrent.id} className={classes} onClick={() => dispatch(torrentSelected({ ids: [torrent.id] }))}>{cells}</li>
    })

  return <ul className="rows">{items}</ul>;
}
