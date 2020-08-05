import { combineReducers } from '@reduxjs/toolkit';

export * from './state';
export * from './types';
export * from './actions';
export * from './set-labels';
export * from './torrent-remove';
export * from './torrent-details';

import torrentDetails from './torrent-details';
import setLabels from './set-labels';
import torrentRemove from './torrent-remove';

export default combineReducers({
  torrentDetails,
  setLabels,
  torrentRemove
})
