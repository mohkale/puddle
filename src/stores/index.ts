import { configureStore } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

import torrentReducer, { TorrentState } from './torrent-store';
import { TorrentId } from '@puddle/transmission';

const store = configureStore({
  reducer: {
    torrents: torrentReducer
  }
})

export interface RootState {
  torrents: TorrentState
}

export const selectColumns = (state: RootState) => state.torrents.columns
export const selectTorrentById = (id: TorrentId) =>
  (state: RootState) => state.torrents.torrentEntries[id]

export default store
export type AppDispatch = typeof store.dispatch
