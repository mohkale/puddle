import { configureStore } from '@reduxjs/toolkit';

import columnsReducer, { ColumnState } from './columns';
import torrentReducer, { TorrentState } from './torrent';

const store = configureStore({
  reducer: {
    columns: columnsReducer,
    torrents: torrentReducer
  }
})

export interface RootState {
  columns: ColumnState
  torrents: TorrentState
}

export default store
export type AppDispatch = typeof store.dispatch
