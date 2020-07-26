import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Torrent, selected as torrentSelected, TorrentState
} from '@puddle/stores/torrent-store';
import { RootState, selectColumns } from '@puddle/stores';
import { ColumnState, Column, ColumnType } from '@puddle/stores/columns-store';
import TorrentResponse, {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission/responses/torrent';
// import { TorrentId } from '@puddle/transmission';

import {
  scaleBytes, timeFormat, padString
} from '@puddle/utils';
import ProgressBar from './progress-bar';

import { TorrentId } from '@puddle/transmission';
import { selectTorrentById } from '@puddle/stores';

// TODO maybe convert to a Pure component?
function renderColumn(cType: ColumnType, torrent: Torrent): React.ReactNode {
  switch (cType) {
    case ColumnType.NAME:
      return torrent.name
    case ColumnType.PROGRESS:
      return <ProgressBar progress={torrent.percentDone * 100} status={torrent.status} />;
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
  }
}

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

/**
 * assign the classes
 */
function torrentClasses(torrent: Torrent) {
  const classes: string[] = []
  switch (torrent.status) {
    case TorrentStatus.STOPPED:
      classes.push('is-stopped')
      break
    case TorrentStatus.DOWNLOAD_WAIT:
      classes.push('is-downloading-queued')
    case TorrentStatus.DOWNLOAD:
      classes.push('is-downloading')
      break
    case TorrentStatus.SEED_WAIT:
      classes.push('is-seeding-queued')
    case TorrentStatus.SEED:
      classes.push('is-seeding')
      break
    case TorrentStatus.CHECK_WAIT:
      classes.push('is-checking-queued')
    case TorrentStatus.CHECK:
      classes.push('is-checking')
      break
  }
  if (torrent.isFinished) classes.push('is-finished')

  return classes
}

interface TableRowProps {
  id: TorrentId
}
function TableRow(props: { id: TorrentId }) {
  const dispatch = useDispatch()
  const torrent = useSelector(selectTorrentById(props.id))
  const columnsState: ColumnState = useSelector(selectColumns)
  const columns: [ColumnType, Column][] = columnsState.columnOrder
    .map(cType => [cType, columnsState.columns[cType]])

  const classes = [...torrentClasses(torrent), torrent.selected ? 'active' : ''].join(' ')

  const onClick = (e: React.MouseEvent) => {
    dispatch(torrentSelected({ ids: [props.id], append: e.ctrlKey }))
  }

  const cells = columns.map(([cType, col]) => {
    const cellClasses = ["table-cell", col.title].join(' ')

    return (
      <div className={cellClasses} key={col.title}
           style={{width: col.width}} >
        <div>{renderColumn(cType, torrent)}</div>
      </div>
    )
  })

  return <li className={classes} onClick={onClick}>{cells}</li>
}

export default function TableBody() {
  const torrents = useSelector((state: RootState) => state.torrents.orderedTorrents)

  const rows = torrents
    .map(id => {
      return <TableRow key={id} id={id} />
    })

  return <ul className="rows">{rows}</ul>;
}
