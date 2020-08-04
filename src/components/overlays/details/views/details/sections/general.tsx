import React, { Fragment, useContext } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTorrentById, torrentPriorityChanged, torrentsUpdated,
  TorrentState, updateTorrent
} from '@puddle/stores'
import { TorrentDetailed, Torrent } from '@puddle/models';
import { scaleBytes } from '@puddle/utils';
import { TransmissionError } from '@puddle/transmission';
import { TableSection, Missing, formatDate } from '../section';
import { torrentSelector } from '../../../utils';

export function GeneralSection() {
  const addedDate = useSelector(torrentSelector(t => t.addedDate));
  const downloadDir = useSelector(torrentSelector(t => t.downloadDir));
  const labels = useSelector(torrentSelector(t => t.labels));

  const tags = labels.length === 0 ? (<Missing/>) : (
    <ul className="tags">
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
      }
    ]
  })
}
