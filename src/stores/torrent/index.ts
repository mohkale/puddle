import { createSlice, createAction } from '@reduxjs/toolkit';

import Transmission, { TorrentId } from '@puddle/transmission';
import TorrentResponse, {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission/responses/torrent';

export * from './torrent';
import { Torrent, TORRENT_FIELDS } from './torrent';

export interface TorrentState {
  torrents: TorrentId[]
  selectedTorrents: TorrentId[]
  torrentEntries: { [key in TorrentId]: Torrent }
}

const defaultState: TorrentState = {
  torrents: [],
  selectedTorrents: [],
  torrentEntries: {},
}

interface TorrentActionType {
  /**
   * Torrent response with associated fields that're being updated.
   */
  torrents: Torrent[]
}

/** action for when we're updating one or more torrents. */
export const updated = createAction<TorrentActionType>('torrents/updated')

/** action for when one or more new torrents have been added. */
export const added = createAction<TorrentActionType>('torrents/added')

/** action for when one or more torrents have been removed. */
export const removed = createAction<{ ids: TorrentId[] }>('torrents/removed')

/** action for selecting one or more torrents from the torrent list. */
export const selected = createAction<{ ids: TorrentId[], append?: boolean }>('torrents/select')

/**
 * Remove all elements from the store and then fetch the current
 * torrent-list from transmission and assign it.
 */
export const syncTorrents =
  (client: Transmission, callback?: VoidFunction) => {
    return async (dispatch, getState) => {
      const state = getState()
      dispatch(removed({ ids: state.torrents.torrents }))
      dispatch(added({ torrents: await client.torrents(undefined, ...TORRENT_FIELDS) }))

      callback && callback!()
    }
  }

/**
 * Asynchronously fetch the current torrent list from the transmission
 * daemon and then update the local store. If {@code callback} is provided
 * then it is invoked before this function exits.
 */
export const updateTorrents =
  (client: Transmission, callback?: VoidFunction) => {
    return async (dispatch, getState) => {
      const active = await client.recentlyActiveTorrents(...TORRENT_FIELDS);
      const torrents = active.torrents as Torrent[], removedTorrents = active.removed
      const state = getState()

      if (removed.length > 0) {
        dispatch(removed({ ids: removedTorrents }))
      }

      if (torrents.length > 0) {
        const existingIds = new Set<TorrentId>(state.torrents.torrents)
        const newTorrents: Torrent[] = [], updatedTorrents: Torrent[] = [];
        torrents.forEach(torrent =>
          (existingIds.has(torrent.id) ? updatedTorrents : newTorrents).push(torrent))

        if (newTorrents.length > 0)     dispatch(added({ torrents: newTorrents }))
        if (updatedTorrents.length > 0) dispatch(updated({ torrents: updatedTorrents }))
      }

      callback && callback!()
    }
  }

const torrentSlice = createSlice({
  name: 'torrents',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(added, (state, action) => {
        action.payload.torrents.forEach(torrent => {
          state.torrents.push(torrent.id!)
          state.torrentEntries[torrent.id!] = torrent
        })
      })
      .addCase(removed, (state, action) => {
        action.payload.ids.forEach(id => {
          const index = state.torrents.indexOf(id)
          if (index !== -1) {
            state.torrents.splice(index, 1)
          }
        })
      })
      .addCase(updated, (state, action) => {
        action.payload.torrents.forEach((torrent) => {
          state.torrentEntries[torrent.id] = torrent
        })
      })
      .addCase(selected, (state, action) => {
        if (action.payload.append) {
          state.selectedTorrents.push(...action.payload.ids)
        } else {
          state.selectedTorrents = action.payload.ids
        }
      })
})

export default torrentSlice.reducer
