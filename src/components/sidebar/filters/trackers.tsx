import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { extractHostname } from '@puddle/utils';
import { RootState } from '@puddle/stores';
import { filterTrackersUpdated, selectTorrentTrackersWithMeta } from '@puddle/stores';

import FilterList, { FilterListBadge } from './filter-list';

export default function TrackerFilters() {
  const dispatch = useDispatch()
  const trackers = useSelector(selectTorrentTrackersWithMeta)

  const entries = trackers
    .map(({ tracker, hostname, count, isActive }) => {
      const classes = isActive ? 'selected' : ''
      const onClick = () => {
        if (isActive) {
          dispatch(filterTrackersUpdated({ remove: tracker }))
        } else {
          dispatch(filterTrackersUpdated({ add: tracker }))
        }
      }

      return (
        <li key={tracker} className={classes} onClick={onClick}>
          {extractHostname(tracker)}
          <FilterListBadge num={count}/>
        </li>
      )
    })

  return <FilterList title="Filter by Trackers">{entries}</FilterList>
}
