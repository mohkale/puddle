import React, { Fragment, useContext } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTorrentById, torrentPriorityChanged, torrentsUpdated,
  TorrentState, updateTorrent
} from '@puddle/stores'
import { TorrentDetailsContext } from '../../../context';
import { TorrentDetailed, Torrent } from '@puddle/models';
import { scaleBytes } from '@puddle/utils';
import { TransmissionError } from '@puddle/transmission';
import { TableSection, Missing, formatDate } from '../section';

type GeneralSectionProps =
  Pick<TorrentDetailed, 'addedDate' | 'downloadDir' | 'labels'>

export const GeneralSection = React.memo<GeneralSectionProps>((props) => {
  const tags = props.labels.length === 0 ? (<Missing/>) : (
    <ul className="tags">
      {props.labels.map(label => <li key={label}>{label}</li>)}
    </ul>
  )

  return TableSection({
    title: 'General',
    entries: [
      {
        key: 'Added',
        val: formatDate(props.addedDate)
      },
      {
        key: 'Location',
        val: props.downloadDir,
      },
      {
        key: 'Tags',
        val: tags
      }
    ]
  })
})


