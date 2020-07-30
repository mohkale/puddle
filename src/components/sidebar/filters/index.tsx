import './styles';
import React, { Fragment } from 'react';

import SearchBar from './search';
import ClassFilters from './class';
import LabelFilters from './labels';
import TrackerFilters from './trackers';

import { Scrollbar } from 'react-scrollbars-custom';

export default function Filters() {
  return (
    <Fragment>
      <SearchBar />

      <Scrollbar>
        <ClassFilters />
        <LabelFilters/>
        <TrackerFilters />
      </Scrollbar>
    </Fragment>
  )
}
