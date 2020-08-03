import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  filterTrackersUpdated, selectTorrentTrackersWithMeta
} from '@puddle/stores';

import FilterList from './filter-list';
import { Badge } from '@puddle/components'

export default function TrackerFilters() {
  const dispatch = useDispatch()
  const trackers = useSelector(selectTorrentTrackersWithMeta)

  const entries = trackers
    .map(({ tracker, hostname, count, isActive }) => {
      const classes = isActive ? 'selected' : ''
      const toggleSelection = () => {
        if (isActive) {
          dispatch(filterTrackersUpdated({ remove: tracker }))
        } else {
          dispatch(filterTrackersUpdated({ add: tracker }))
        }
      }

      const onKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          toggleSelection()
        }
      }

      return (
        <li key={tracker} className={classes} title={tracker}
            onClick={toggleSelection} tabIndex={0} onKeyPress={onKeyPress}>
          {hostname}
          <Badge num={count}/>
        </li>
      )
    })

  return <FilterList title="Filter by Trackers">{entries}</FilterList>
}
