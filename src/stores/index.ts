import { configureStore } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

export * from './state';
export * from './selectors'
export * from './torrent';
export * from './fields';
export * from './classes';

export * from './torrents-store';
export * from './settings-store';
export * from './stats-store';

import { RootState } from './state';

import statsReducer from './stats-store';
import settingsReducer from './settings-store';
import torrentReducer  from './torrents-store';

const store = configureStore<RootState>({
  reducer: {
    torrents: torrentReducer,
    settings: settingsReducer,
    stats: statsReducer
  }
})

export default store
export type AppDispatch = typeof store.dispatch
