import { configureStore } from '@reduxjs/toolkit';

export * from './state';
export * from './selectors'
export * from './torrent';
export * from './fields';
export * from './classes';

export * from './torrents-store';
export * from './settings-store';
export * from './stats-store';
export * from './ui-store';

import { RootState } from './state';

import uiReducer from './ui-store';
import statsReducer from './stats-store';
import settingsReducer from './settings-store';
import torrentReducer  from './torrents-store';

// WARN for some reason, if you use configureStore<RootState>
// then you can't pass a middleware callback :/.
const store = configureStore({
  reducer: {
    ui: uiReducer,
    stats: statsReducer,
    torrents: torrentReducer,
    settings: settingsReducer,
  },
  // I don't need immutable checks, redux is using immer by default.
  middleware: getDefault => getDefault({ immutableCheck: false })
})

export default store
export type AppDispatch = typeof store.dispatch
