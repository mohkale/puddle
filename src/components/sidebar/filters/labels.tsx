import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  filterLabelsUpdated, selectTorrentByLabelsWithMeta
} from '@puddle/stores';

import FilterList, { FilterListBadge } from './filter-list';

export default function TrackerFilters() {
  const dispatch = useDispatch()
  const labels = useSelector(selectTorrentByLabelsWithMeta)

  const entries = labels
    .map(({label, count, isActive}) => {
      const classes = isActive ? 'selected' : ''
      const onClick = () => {
        if (isActive) {
          dispatch(filterLabelsUpdated({ remove: label }))
        } else {
          dispatch(filterLabelsUpdated({ add: label }))
        }
      }

      return (
        <li key={label} className={classes} onClick={onClick}>
          {label}
          <FilterListBadge num={count}/>
        </li>
      );
    })

  return <FilterList title="Filter by Tags">{entries}</FilterList>
}

