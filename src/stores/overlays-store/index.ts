import { combineReducers } from '@reduxjs/toolkit';

export * from './state';
export * from './types';
export * from './actions';

export * from './details';
export * from './set-labels';
export * from './torrent-remove';

import torrentDetails from './details';
import setLabels from './set-labels';
import torrentRemove from './torrent-remove';

export default combineReducers({
  torrentDetails,
  setLabels,
  torrentRemove
})
