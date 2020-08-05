import { combineReducers } from '@reduxjs/toolkit';

export * from './state';
export * from './types';
export * from './actions';
export * from './set-labels';
export * from './torrent-details';

import torrentDetails from './torrent-details';
import setLabels from './set-labels';

export default combineReducers({
  torrentDetails,
  setLabels
})
