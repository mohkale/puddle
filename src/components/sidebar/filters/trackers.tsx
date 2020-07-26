import React from 'react';

import { useSelector } from 'react-redux';
import { extractHostname } from '@puddle/utils';
import { RootState } from '@puddle/stores';

import FilterList, { FilterListBadge } from './filter-list';

export default function TrackerFilters() {
  const trackers = useSelector((state: RootState) => state.torrents.byTracker)
  const trackerEntries = Object.entries(trackers)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([tracker, torrents]) => {
      return (
        <li key={tracker} className="filter">
          {extractHostname(tracker)}
          <FilterListBadge num={torrents.length}/>
          </li>
      )
    })

  return <FilterList title="Filter by Trackers">{trackerEntries}</FilterList>
}

