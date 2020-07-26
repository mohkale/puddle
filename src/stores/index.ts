import { configureStore } from '@reduxjs/toolkit';

import torrentReducer, { TorrentState } from './torrent-store';

const store = configureStore({
  reducer: {
    torrents: torrentReducer
  }
})

export interface RootState {
  torrents: TorrentState
}

export const selectColumns = (state: RootState) => state.torrents.columns

export default store
export type AppDispatch = typeof store.dispatch
