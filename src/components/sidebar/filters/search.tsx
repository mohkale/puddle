import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import { RootState } from '@puddle/stores';
import { filterUpdated } from '@puddle/stores/torrent-store';

import { DelayInput } from 'react-delay-input';

/**
 * How long a search should be idle before we automatically start
 * searching. The shorter it is, the more bogus searches will take
 * place. The longer it is, the less intuitive the search feels.
 *
 * TODO calibrate to feel just right.
 */
const QUERY_SET_TIMEOUT = 200

export default function SearchBar() {
  const dispatch = useDispatch()
  const query = useSelector((state: RootState) => state.torrents.filters.query)
  const isActive = query !== ''

  const onClear = (e: React.SyntheticEvent) => {
    dispatch(filterUpdated({ query: '' }))
  }

  const onChange = (e: any) => {
    dispatch(filterUpdated({ query: (e.target.value || '') as string }))
  }

  return (
    <div id="searchbar" className={isActive ? 'active' : ''}>
      <FontAwesomeIcon icon={faSearch} className="icon search" />
      <DelayInput name="query" type="text" placeholder="Search Torrents"
                  autoComplete="false" onChange={onChange}
                  delayTimeout={QUERY_SET_TIMEOUT} value={query} />
      {isActive &&
        <FontAwesomeIcon icon={faTimes} className="icon cancel" onClick={onClear} />}
    </div>
  )
}
