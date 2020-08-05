import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  selectColumns, torrentSelected,
  selectTorrentById, selectTorrentIsSelected,
  torrentRangeSelected
} from '@puddle/stores';
import { Torrent } from '@puddle/models';
import { TransmissionTorrentStatus as TorrentStatus } from '@puddle/transmission';

import renderColumn from './column';

/** assign the classes for a torrent row. */
export function torrentClasses(torrent: Torrent, isSelected: boolean) {
  const classes: string[] = ['torrent']
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

  if (torrent.progress === 1)
    classes.push('is-finished')
  else if (torrent.error !== 0)
    classes.push('has-error')

  if (isSelected)
    classes.push('selected')

  return classes.join(' ')
}

export default function TorrentRow(props: { id: number, onRightClick: (e: React.MouseEvent, id: number) => void }) {
  const dispatch = useDispatch()
  const torrent = useSelector(selectTorrentById(props.id))
  const columns = useSelector(selectColumns)
  const isSelected = useSelector(selectTorrentIsSelected(props.id))

  const classes = torrentClasses(torrent, isSelected)

  const onClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      dispatch(torrentRangeSelected(props.id))
    } else {
      dispatch(torrentSelected({ ids: [props.id], append: e.ctrlKey }))
    }
  }

  const onContextMenu = (e: React.MouseEvent) => {
    if (!isSelected) {
      dispatch(torrentSelected({ ids: [props.id] }))
    }

    props.onRightClick(e, props.id)
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

  return <li className={classes} onClick={onClick} onContextMenu={onContextMenu}>{cells}</li>
}
