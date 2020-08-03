import React, { Fragment, useContext } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { TorrentDetailsContext } from '../../context';
import { selectTorrentById, torrentPriorityChanged, torrentsUpdated, TorrentState, updateTorrent, Torrent } from '@puddle/stores'
import { TorrentFull } from '../../torrent-full';
import { scaleBytes } from '@puddle/utils';
import { TransmissionError } from '@puddle/transmission';

export function Missing(props) {
  return <span className="missing">{props.children || 'None'}</span>
}

export function formatDate(stamp: number) {
  return moment(stamp * 1000).format('MMMM DD, YYYY hh:mm A')
}

interface TableSectionType {
  title: string
  entries: { key: string, val: React.ReactNode }[]
}

export function TableSection(props: TableSectionType) {
  const entries = props.entries
    .map(({key, val}) => {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>{val}</td>
        </tr>
      );
    })

  return (
    <Fragment>
      <tr><td colSpan={2}>{props.title}</td></tr>
      {entries}
    </Fragment>
  )
}
