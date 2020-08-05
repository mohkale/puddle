import React from 'react';
import { useSelector } from 'react-redux';

import { scaleBytes } from '@puddle/utils';
import { torrentSelector } from '../../../utils';
import { TableSection, Missing, formatDate } from '../section';

export function TorrentSection() {
  const [size, sizeUnit] = scaleBytes(useSelector(torrentSelector(t => t.totalSize)))
  const dateCreated = useSelector(torrentSelector(t => t.dateCreated))
  const hashString = useSelector(torrentSelector(t => t.hashString))
  const creator = useSelector(torrentSelector(t => t.creator))
  const comment = useSelector(torrentSelector(t => t.comment))
  const isPrivate = useSelector(torrentSelector(t => t.isPrivate))

  return TableSection({
    title: 'Torrent',
    entries: [
      {
        key: 'Creator',
        val: creator === '' ? (<Missing>Unknown</Missing>) : creator,
      },
      {
        key: 'Creation Date',
        val: formatDate(dateCreated)
      },
      {
        key: 'Hash',
        val: hashString
      },
      {
        key: 'Size',
        val: `${size.toFixed(2)}${sizeUnit}`
      },
      {
        key: 'Comment',
        val: comment === '' ? (<Missing />) : comment,
      },
      {
        key: 'Type',
        val: isPrivate ? 'Private' : 'Public'
      }
    ]
  })
}
