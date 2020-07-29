import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Torrent, TorrentState, selectColumns, torrentSelected
} from '@puddle/stores';
import { RootState, selectFilteredTorrents } from '@puddle/stores';
import { TorrentFields, Column } from '@puddle/stores';
import { TransmissionTorrentStatus as TorrentStatus } from '@puddle/transmission';

import FlexSearch from 'flexsearch';

import {
  scaleBytes, timeFormat, padString
} from '@puddle/utils';
import { TorrentId } from '@puddle/transmission';
import { selectTorrentById } from '@puddle/stores';

import renderColumn from './column';

/** assign the classes for a torrent row. */
function torrentClasses(torrent: Torrent, isSelected: boolean) {
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

  if (torrent.percentDone === 1)
    classes.push('is-finished')
  else if (torrent.error !== 0)
    classes.push('has-error')

  if (isSelected)
    classes.push('selected')

  return classes.join(' ')
}

export default function TorrentRow(props: { id: number }) {
  const dispatch = useDispatch()
  const torrent = useSelector(selectTorrentById(props.id))
  const columns = useSelector(selectColumns)

  const classes = torrentClasses(torrent, torrent.selected)

  const onClick = (e: React.MouseEvent) => {
    dispatch(torrentSelected({ ids: [props.id], append: e.ctrlKey }))
  }

  const cells = columns.map((column) => {
    const cellClasses = ["table-cell", column.title].join(' ')

    return (
      <div className={cellClasses} key={column.title}
           style={{width: column.width}} >
        <div>{renderColumn(column.field, torrent)}</div>
      </div>
    )
  })

  return <li className={classes} onClick={onClick}>{cells}</li>
}
