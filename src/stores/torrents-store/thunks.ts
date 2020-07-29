import { RootState, RootThunk } from '../state';
import { ThunkAction } from 'redux-thunk';
import { Torrent, fromResponse as torrentFromResponse, TORRENT_FIELDS } from '../torrent';
import Transmission, { TorrentId } from '@puddle/transmission';

import {
  torrentsAdded, torrentsRemoved, torrentsUpdated
} from './actions';

import { arrayRemove } from '@puddle/utils';

/**
 * Remove all elements from the store and then fetch the current
 * torrent-list from transmission and assign it.
 */
export const syncTorrents =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch, getState) => {
      const state: RootState = getState()

      // remove all the existing torrents.
      dispatch(torrentsRemoved({ ids: state.torrents.ids }))

      // add the current torrent list as specified by transmission.
      const torrents = await client.torrents(undefined, ...TORRENT_FIELDS)
      dispatch(torrentsAdded({ torrents: torrents.map(torrentFromResponse) }))
    }
  }

/**
 * Asynchronously fetch the current torrent list from the transmission
 * daemon and then update the local store.
 */
export const updateTorrents =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch, getState) => {
      const active = await client.recentlyActiveTorrents(...TORRENT_FIELDS);
      const torrents = active.torrents, removedTorrents = active.removed

      if (removedTorrents.length > 0) {
        dispatch(torrentsRemoved({ ids: removedTorrents }))
      }

      if (torrents.length > 0) {
        const state: RootState = getState()
        const existingIds = new Set<TorrentId>(state.torrents.ids)
        const newTorrents: Torrent[] = [], updatedTorrents: Torrent[] = [];
        torrents.forEach(torrent => {
          if (existingIds.has(torrent.id!)) {
            updatedTorrents.push(torrentFromResponse(torrent, state.torrents.entries[torrent.id!]))
          } else {
            newTorrents.push(torrentFromResponse(torrent))
          }
        })

        if (newTorrents.length > 0)     dispatch(torrentsAdded({ torrents: newTorrents }))
        if (updatedTorrents.length > 0) dispatch(torrentsUpdated({ torrents: updatedTorrents }))
      }
    }
  }
