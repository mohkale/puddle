import React from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';

import { torrentSelector } from '../../../utils';
import { TableSection, Missing } from '../section';
import { TransmissionTorrentStatus as TorrentState } from '@transmission';

export function TransferSection() {
  const percentDone = useSelector(torrentSelector(t => t.percentDone))
  const peerCount = useSelector(torrentSelector(t => t.peersConnected))
  const state = useSelector(torrentSelector(t => t.status))
  const startDate = useSelector(torrentSelector(t => t.startDate))
  const activityDate = useSelector(torrentSelector(t => t.activityDate));

  return TableSection({
    title: 'Transfer',
    entries: [
      {
        key: 'Progress',
        val: `${(percentDone * 100).toFixed(2)}%`
      },
      {
        key: 'Peers',
        val: `${peerCount}`
      },
      {
        key: 'Running Time',
        val: state === TorrentState.STOPPED ? <Missing>Unknown</Missing> :
          moment(startDate * 1000).fromNow(true)
      },
      {
        key: 'Last Active',
        val: activityDate === 0 ? <Missing>Never</Missing> :
          moment(activityDate * 1000).fromNow()
      }
    ]
  })
}
