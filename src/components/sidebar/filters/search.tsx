import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import store, { filterQueryUpdated, selectFilterQuery } from '@puddle/stores';

import { DelayInput } from 'react-delay-input';

/**
 * How long a search should be idle before we automatically start
 * searching. The shorter it is, the more bogus searches will take
 * place. The longer it is, the less intuitive the search feels.
 *
 * TODO calibrate to feel just right.
 */
const QUERY_SET_TIMEOUT = 100

const removeSearchQuery = () => store.dispatch(filterQueryUpdated(''))
const updateSearchQuery = (query: string) => store.dispatch(filterQueryUpdated(query))

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function unfocusSearchBar(ref: any) {
  if (!ref.current) {
    console.warn('search bar reference is unassigned');
    return
  }

  ref.current!.blur()
}

/**
 * parent key handler for the search bar. This suppresses all of the
 * root key bindings of the client view and introduces new bindings
 * over the defaults for an Input Element.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function searchBarKeyHandler(e: React.KeyboardEvent, searchRef: any) {
  // isolate key requests to within the search input.
  // prevents the root key handler being invoked from here.
  e.stopPropagation()

  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault()
    removeSearchQuery()
    unfocusSearchBar(searchRef)
  } else if (e.key === 'Escape') {
    unfocusSearchBar(searchRef)
  }
}

/* eslint-disable-next-line react/display-name */
const SearchBar = React.forwardRef<HTMLInputElement|undefined>((_, ref) => {
  const query = useSelector(selectFilterQuery)
  const isActive = query !== ''

  const onChange = (e) => updateSearchQuery((e.target.value || '') as string)

  const classNames = [
    'searchbar', isActive && 'searchbar--selected'
  ]

  return (
    <div className={classNames.join(' ')}
         onKeyDown={(e) => searchBarKeyHandler(e, ref)}>
      <FontAwesomeIcon icon={faSearch} className="searchbar__search-icon searchbar__icon" />
      <DelayInput name="query" type="text" placeholder="Search Torrents"
                  autoComplete="false" onChange={onChange} inputRef={ref}
                  delayTimeout={QUERY_SET_TIMEOUT} value={query} />
      {isActive &&
        <FontAwesomeIcon icon={faTimes} className="searchbar__cancel-icon searchbar__icon" onClick={removeSearchQuery} />}
    </div>
  );
})

export default SearchBar
