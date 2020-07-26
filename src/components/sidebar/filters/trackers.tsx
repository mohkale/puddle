import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { extractHostname } from '@puddle/utils';
import { RootState } from '@puddle/stores';
import { filterUpdated } from '@puddle/stores/torrent-store';

import FilterList, { FilterListBadge } from './filter-list';

export default function TrackerFilters() {
  const dispatch = useDispatch()
  const trackers = useSelector((state: RootState) => state.torrents.byTracker)
  const activeTrackers = new Set(useSelector((state: RootState) => state.torrents.filters.trackers))

  const trackerEntries = Object.entries(trackers)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([tracker, torrents]) => {
      const isActive = activeTrackers.has(tracker)
      const classes = ["filter", isActive ? 'active' : '']
      const onClick = () => {
        if (isActive) {
          dispatch(filterUpdated({ filters: { remove: tracker } }))
        } else {
          dispatch(filterUpdated({ filters: { add: tracker } }))
        }
      }

      return (
        <li key={tracker} className={classes.join(' ')} onClick={onClick}>
          {extractHostname(tracker)}
          <FilterListBadge num={torrents.length}/>
        </li>
      )
    })

  return <FilterList title="Filter by Trackers">{trackerEntries}</FilterList>
}

