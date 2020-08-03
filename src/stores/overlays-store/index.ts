import { combineReducers } from '@reduxjs/toolkit';

export * from './state';
export * from './types';
export * from './actions';
export * from './torrent-details';

import torrentDetails from './torrent-details';

export default combineReducers({
  torrentDetails
})
