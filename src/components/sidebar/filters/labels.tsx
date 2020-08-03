import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  filterLabelsUpdated, selectTorrentByLabelsWithMeta
} from '@puddle/stores';

import FilterList from './filter-list';
import { Badge } from '@puddle/components'

export default function TrackerFilters() {
  const dispatch = useDispatch()
  const labels = useSelector(selectTorrentByLabelsWithMeta)

  const entries = labels
    .map(({label, count, isActive}) => {
      const classes = isActive ? 'selected' : ''
      const toggleSelection = () => {
        if (isActive) {
          dispatch(filterLabelsUpdated({ remove: label }))
        } else {
          dispatch(filterLabelsUpdated({ add: label }))
        }
      }

      const onKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          toggleSelection()
        }
      }

      return (
        <li key={label} className={classes} onClick={toggleSelection}
            tabIndex={0} onKeyPress={onKeyPress}>
          {label}
          <Badge num={count}/>
        </li>
      );
    })

  return <FilterList title="Filter by Tags">{entries}</FilterList>
}

