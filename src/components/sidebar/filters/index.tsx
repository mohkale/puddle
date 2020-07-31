import './styles';
import React, { Fragment } from 'react';

import SearchBar from './search';
import ClassFilters from './class';
import LabelFilters from './labels';
import TrackerFilters from './trackers';

import { Scrollbar } from 'react-scrollbars-custom';

export interface FiltersProps {
  searchRef: React.MutableRefObject<HTMLInputElement|undefined>
}

export default function Filters(props: FiltersProps) {
  return (
    <Fragment>
      <SearchBar ref={props.searchRef} />

      <Scrollbar>
        <ClassFilters />
        <LabelFilters/>
        <TrackerFilters />
      </Scrollbar>
    </Fragment>
  )
}
