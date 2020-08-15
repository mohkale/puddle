import { RootState, RootThunk } from '../state';
import { torrentsAdded, torrentsRemoved, torrentsUpdated } from './actions';
import { notifyTorrentAdded, notifyTorrentRemoved } from '../notifications-store'

import { Torrent, torrentFromResponse, TORRENT_FIELDS } from '@client/models';
import Transmission, {
  TorrentId, TransmissionTorrent as TorrentResponse
} from '@transmission/client';

import { notifyRequestError } from '@client/stores/notifications-store';

/* eslint-disable @typescript-eslint/no-explicit-any */

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
      try {
        const torrents = await client.torrents(undefined, ...TORRENT_FIELDS)
        dispatch(torrentsAdded({ torrents: torrents.map(torrentFromResponse) }))
      } catch (err) {
        dispatch(notifyRequestError({
          to: 'transmission', errorMessage: err.toString(), description: 'fetching torrents list afresh'
        }))
      }
    }
  }

export const _handleTorrentsRemoved = (removed: number[]): RootThunk => {
  return async (dispatch, getState) => {
    // NOTE we may be able to avoid these sorts of checks by keeping
    // a list of recently removed torrents and comparing against them
    // instead of all torrents.

    const state = getState()
    const existingIds = new Set<TorrentId>(state.torrents.ids)
    removed = removed.filter((id) => existingIds.has(id))

    if (removed.length > 0) {
      dispatch(torrentsRemoved({ ids: removed }))
      dispatch(notifyTorrentRemoved(removed.map(id => ({
        torrent: state.torrents.entries[id]
      }))))
    }
  }
}

export const _handleTorrentUpdated = (torrents: Partial<TorrentResponse>[]): RootThunk => {
  return async (dispatch, getState) => {
    const state = getState()
    const existingIds = new Set<TorrentId>(state.torrents.ids)
    const newTorrents: Torrent[] = [], updatedTorrents: Torrent[] = [];

    torrents.forEach(torrent => {
      if (existingIds.has(torrent.id!)) {
        updatedTorrents.push(torrentFromResponse(torrent, state.torrents.entries[torrent.id!]))
      } else {
        newTorrents.push(torrentFromResponse(torrent))
      }
    })

    if (newTorrents.length > 0) {
      dispatch(torrentsAdded({ torrents: newTorrents }))
      dispatch(notifyTorrentAdded(newTorrents))
    }

    if (updatedTorrents.length > 0)
      dispatch(torrentsUpdated({ torrents: updatedTorrents }))
  }
}

/**
 * Asynchronously fetch the current torrent list from the transmission
 * daemon and then update the local store.
 */
export const updateRecentlyActiveTorrents =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch) => {
      let active;
      try {
        active = await client.recentlyActiveTorrents(...TORRENT_FIELDS);
      } catch (err) {
        dispatch(notifyRequestError({
          to: 'transmission', errorMessage: err.toString(), description: 'fetching recently active torrents'
        }))
        return
      }

      const torrents = active.torrents, removedTorrents = active.removed

      if (removedTorrents.length > 0) {
        await dispatch(_handleTorrentsRemoved(removedTorrents));
      }

      if (torrents.length > 0) {
        await dispatch(_handleTorrentUpdated(torrents));
      }
    }
  }

export const updateTorrent =
  (ids: number[], client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch) => {
      try {
        const torrents = await client.torrents(ids, ...TORRENT_FIELDS);
        await dispatch(torrentsUpdated({ torrents }))
      } catch (err) {
        dispatch(notifyRequestError({
          to: 'transmission', errorMessage: err.toString(), description: 'updating a torrent'
        }))
      }
    }
  }
