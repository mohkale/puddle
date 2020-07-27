import './styles';
import React, { Fragment } from 'react';

import SearchBar from './search';
import StatusFilters from './status';
import TrackerFilters from './trackers';

import { Scrollbar } from 'react-scrollbars-custom';

export default function Filters() {
  return (
    <Fragment>
      <SearchBar />

      <Scrollbar>
        <StatusFilters />
        <TrackerFilters />
      </Scrollbar>
    </Fragment>
  )
}

