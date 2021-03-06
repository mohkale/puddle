import { configureStore } from '@reduxjs/toolkit';

export * from './state';
export * from './selectors'

export * from './torrents-store';
export * from './settings-store';
export * from './stats-store';
export * from './ui-store';
export * from './notifications-store';
export * from './overlays-store';

import uiReducer from './ui-store';
import statsReducer from './stats-store';
import settingsReducer, { settingsUpdated } from './settings-store';
import torrentReducer from './torrents-store';
import notificationsReducer from './notifications-store';
import overlaysReducer from './overlays-store';

import { settings } from '@server/api';

// WARN for some reason, if you use configureStore<RootState>
// then you can't pass a middleware callback :/.
const store = configureStore({
  reducer: {
    ui: uiReducer,
    stats: statsReducer,
    torrents: torrentReducer,
    settings: settingsReducer,
    notifications: notificationsReducer,
    overlays: overlaysReducer,
  },

  // I don't need immutable checks, redux is using immer by default.
  middleware: getDefault => getDefault({ immutableCheck: false })
})

settings()
  .then(resp => store.dispatch(settingsUpdated(resp)))

export default store
export type AppDispatch = typeof store.dispatch
