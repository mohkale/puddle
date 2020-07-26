import { createSlice, createAction } from '@reduxjs/toolkit';

import Transmission, { TorrentId } from '@puddle/transmission';

export * from './torrent';
import { Torrent, TORRENT_FIELDS } from './torrent';
import { setPartition, arrayRemove } from '@puddle/utils';

import { torrentState, PuddleTorrentStates, PuddleTorrentStateFlags } from '@puddle/utils/filters/status';

export interface TorrentState {
  /**
   * The complete list of identifierrs for torrents known to transmission.
   */
  torrents: TorrentId[]

  /**
   * The subset of torrents from {@code torrents} that the
   * user has currently selected.
   */
  selectedTorrents: TorrentId[]

  /**
   * Mappings from the list of identifiers to actual torrent
   * instances.
   */
  torrentEntries: { [key in TorrentId]: Torrent }

  /**
   * A collection of trackers and the torrents that're associated
   * with them. This is stored seprately from the {@code torrentEntries}
   * to prevent needless re-rendering whenever this is selected.
   */
  byTracker: { [key: string]: TorrentId[] }

  byStatus: { [key in PuddleTorrentStates]: TorrentId[] }
}

function addTorrentToTracker(state: TorrentState, tracker: string, id: TorrentId) {
  if (state.byTracker[tracker] === undefined) {
    state.byTracker[tracker] = [id]
  } else {
    state.byTracker[tracker].push(id)
  }
}

function removeTorrentFromTracker(state: TorrentState, tracker: string, id: TorrentId) {
  const trackerTorrents = state.byTracker[tracker]
  if (trackerTorrents.length === 1) {
    delete state.byTracker[tracker]
  } else {
    arrayRemove(state.byTracker[tracker], id, () => {
      // NOTE this should never happen, but you should account for it anyways.
      console.warn(`removing torrent ${id} but associated tracker doesn't contain it ${tracker}.`)
    })
  }
}

const defaultState: TorrentState = {
  torrents: [],
  torrentEntries: {},

  selectedTorrents: [],

  byTracker: {},
  byStatus: Object.fromEntries(PuddleTorrentStateFlags.map(flag => [flag, []])),
}

/** action for when we're updating one or more torrents. */
export const updated = createAction<{ torrents: Torrent[] }>('torrents/updated')

/** action for when one or more new torrents have been added. */
export const added = createAction<{ torrents: Torrent[] }>('torrents/added')

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
          state.torrents.push(torrent.id)
          state.torrentEntries[torrent.id] = torrent

          const tState = torrentState(torrent)
          PuddleTorrentStateFlags.forEach(flag => {
            if ((flag & tState) !== 0) {
              state.byStatus[flag].push(torrent.id)
            }
          })

          torrent.trackers.forEach(tracker => addTorrentToTracker(state, tracker.announce, torrent.id))
        })
      })
      .addCase(removed, (state, action) => {
        // WARN maybe it'd be more efficient to accept multiple torrents
        // to be removed.
        action.payload.ids.forEach(id => {
          const index = state.torrents.indexOf(id)
          if (index !== -1) {
            const torrent = state.torrents[id]
            state.torrents.splice(index, 1)

            const tState = torrentState(torrent)
            PuddleTorrentStateFlags.forEach(flag => {
              if ((flag & tState) !== 0) {
                arrayRemove(state.byStatus[flag], id)
              }
            })

            // TODO(@URGENT) delete torrent from torrent store. memory leak here
            torrent.trackers.forEach(tracker => removeTorrentFromTracker(state, tracker.announce, id))
          }
        })
      })
      .addCase(updated, (state, action) => {
        action.payload.torrents.forEach((torrent) => {
          const lastState = state.torrentEntries[torrent.id]
          state.torrentEntries[torrent.id] = torrent

          const prevTState = torrentState(lastState),
                nextTState = torrentState(torrent);
          if (prevTState !== nextTState) {
            PuddleTorrentStateFlags.forEach(flag => {
              const inPrevious = (prevTState & flag) !== 0
              const inCurrent = (nextTState & flag) !== 0
              if (inPrevious !== inCurrent) {
                if (inPrevious) { // but not in current
                  arrayRemove(state.byStatus[flag], torrent.id)
                } else { // inCurrent but not in previous
                  state.byStatus[flag].push(torrent.id)
                }
              }
            })
          }

          const [removedTrackers, addedTrackers] = setPartition(
            lastState.trackers.map(t => t.announce),
            torrent.trackers.map(t => t.announce))
          removedTrackers.forEach(tracker => removeTorrentFromTracker(state, tracker, torrent.id))
          addedTrackers.forEach(tracker => addTorrentToTracker(state, tracker, torrent.id))
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
