import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState, RootThunk } from '../state';
import Transmission, { TorrentId, TransmissionTorrent as TorrentResponse } from '@puddle/transmission';
import { torrentsAdded, torrentsRemoved, torrentsUpdated } from './actions';

import {
  notifyTorrentAdded, notifyTorrentRemoved
} from '../notifications-store'

import {
  Torrent, torrentFromResponse, TORRENT_FIELDS
} from '@puddle/models';

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
      const torrents = await client.torrents(undefined, ...TORRENT_FIELDS)
      dispatch(torrentsAdded({ torrents: torrents.map(torrentFromResponse) }))
    }
  }

const handleTorrentsRemoved =
  (dispatch: ThunkDispatch<RootState, unknown, Action<any>>,
   getState: () => RootState, removed: number[]) => {
     // NOTE we may be able to avoid these sorts of checks by keeping
     // a list of recently removed torrents and comparing against them
     // instead of all torrents.

     const state = getState()
     const existingIds = new Set<TorrentId>(state.torrents.ids)
     removed = removed.filter((id) => existingIds.has(id))

     if (removed.length > 0) {
       dispatch(torrentsRemoved({ ids: removed }))
       dispatch(notifyTorrentRemoved(removed.map(id => {
         return {
           id,
           name: state.torrents.entries[id].name
         }
       })))
     }
   }

const handleTorrentUpdated =
  (dispatch: ThunkDispatch<RootState, unknown, Action<any>>,
   getState: () => RootState, torrents: Partial<TorrentResponse>[]) => {
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
       dispatch(notifyTorrentAdded({ ids: newTorrents.map(t => t.id) }))
     }

     if (updatedTorrents.length > 0)
       dispatch(torrentsUpdated({ torrents: updatedTorrents }))
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
        handleTorrentsRemoved(dispatch, getState, removedTorrents);
      }

      if (torrents.length > 0) {
        handleTorrentUpdated(dispatch, getState, torrents);
      }
    }
  }

export const updateTorrent =
  (id: number, client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch, getState) => {
      const torrent = await client.torrent(id, ...TORRENT_FIELDS);
      dispatch(torrentsUpdated({ torrents: [torrent] }))
    }
  }
