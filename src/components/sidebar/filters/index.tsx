import './styles';
import React from 'react';

import SearchBar from './search';
import StatusFilters from './status';
import TrackerFilters from './trackers';

import { Scrollbars } from 'react-custom-scrollbars';

export default function Filters() {
  return (
    <Scrollbars>
      <SearchBar />
      <StatusFilters />
      <TrackerFilters />
    </Scrollbars>
  )
}

