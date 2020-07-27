import { createSlice, createAction } from '@reduxjs/toolkit';

import Transmission, { TorrentId } from '@puddle/transmission';

export * from './torrent';
import { Torrent, TORRENT_FIELDS, fromResponse as torrentFromResponse } from './torrent';
import { setPartition, arrayRemove } from '@puddle/utils';

import torrentComparators from '@puddle/utils/comparators';
import { torrentState, PuddleTorrentStates, PuddleTorrentStateFlags } from '@puddle/utils/filters/status';

import { XOR } from 'ts-xor'

import {
  ColumnState, defaultState as defaultColumnsState, resized as columnResized, selected as columnSelected
} from './columns-store';

export interface TorrentState {
  /**
   * The complete list of identifierrs for torrents known to transmission.
   */
  torrents: TorrentId[]

  /**
   * Torrents ordered by the currently selected column.
   */
  orderedTorrents: TorrentId[]

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

  toName: { [key in TorrentId]: string }

  /**
   * A collection of torrent states and the torrents that're associated
   * with those states.
   */
  byStatus: { [key in PuddleTorrentStates]: TorrentId[] }

  columns: ColumnState

  filters: {
    query: string
    state: PuddleTorrentStates
    trackers: string[]
  }
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

function sortByColumn(state: TorrentState, torrents: TorrentId[]) {
  torrents.sort((idA, idB) => {
    let res = torrentComparators[state.columns.activeColumn](
      state.torrentEntries[idA],
      state.torrentEntries[idB],
    )
    return (!state.columns.isDescending) ? -res : res
  })
}

const defaultState: TorrentState = {
  torrents: [],
  orderedTorrents: [],
  toName: {},
  torrentEntries: {},

  byTracker: {},
  byStatus: {
    [PuddleTorrentStates.ALL]: [],
    [PuddleTorrentStates.DOWNLOADING]: [],
    [PuddleTorrentStates.COMPLETE]: [],
    [PuddleTorrentStates.STOPPED]: [],
    [PuddleTorrentStates.ACTIVE]: [],
    [PuddleTorrentStates.INACTIVE]: [],
    [PuddleTorrentStates.ERROR]: [],
  },
  columns: defaultColumnsState,
  filters: {
    query: '',
    state: PuddleTorrentStates.ALL,
    trackers: []
  }
}

/** action for when we're updating one or more torrents. */
export const updated = createAction<{ torrents: Torrent[] }>('torrents/updated')

/** action for when one or more new torrents have been added. */
export const added = createAction<{ torrents: Torrent[] }>('torrents/added')

/** action for when one or more torrents have been removed. */
export const removed = createAction<{ ids: TorrentId[] }>('torrents/removed')

/** action for selecting one or more torrents from the torrent list. */
export const selected = createAction<{ ids: TorrentId[], append?: boolean }>('torrents/select')

interface FilterUpdatedAction {
  query?: string
  status?: PuddleTorrentStates
  filters?: XOR<{ add: string }, { remove: string }>

}
export const filterUpdated = createAction<FilterUpdatedAction>('torrents/filters/updated')

/**
 * Remove all elements from the store and then fetch the current
 * torrent-list from transmission and assign it.
 */
export const syncTorrents =
  (client: Transmission, callback?: VoidFunction) => {
    return async (dispatch, getState) => {
      const state = getState()

      // remove all the existing torrents.
      dispatch(removed({ ids: state.torrents.torrents }))

      // add the current torrent list as specified by transmission.
      const torrents = await client.torrents(undefined, ...TORRENT_FIELDS)
      dispatch(added({ torrents: torrents.map(torrentFromResponse) }))

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
      const torrents = active.torrents, removedTorrents = active.removed

      if (removed.length > 0) {
        dispatch(removed({ ids: removedTorrents }))
      }

      if (torrents.length > 0) {
        const state = getState()
        const existingIds = new Set<TorrentId>(state.torrents.torrents)
        const newTorrents: Torrent[] = [], updatedTorrents: Torrent[] = [];
        torrents.forEach(torrent => {
          if (existingIds.has(torrent.id!)) {
            updatedTorrents.push(torrentFromResponse(torrent, state.torrents.torrentEntries[torrent.id!]))
          } else {
            newTorrents.push(torrentFromResponse(torrent))
          }
        })

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

          state.orderedTorrents.push(torrent.id)
          state.toName[torrent.id] = torrent.name

          PuddleTorrentStateFlags.forEach(flag => {
            if ((flag & torrent.puddleState) !== 0) {
              state.byStatus[flag].push(torrent.id)
            }
          })

          torrent.trackers.forEach(tracker => addTorrentToTracker(state, tracker.announce, torrent.id))
        })

        sortByColumn(state, state.orderedTorrents)
      })
      .addCase(removed, (state, action) => {
        // WARN maybe it'd be more efficient to accept multiple torrents
        // to be removed.
        action.payload.ids.forEach(id => {
          const index = state.torrents.indexOf(id)
          if (index !== -1) {
            const torrent = state.torrents[id]
            state.torrents.splice(index, 1)
            delete state.toName[torrent.id]

            arrayRemove(state.orderedTorrents, id)

            PuddleTorrentStateFlags.forEach(flag => {
              if ((flag & torrent.puddleState) !== 0) {
                arrayRemove(state.byStatus[flag], id)
              }
            })

            // TODO(@URGENT) delete torrent from torrent store. memory leak here
            torrent.trackers.forEach(tracker => removeTorrentFromTracker(state, tracker.announce, id))
          }
        })
      })
      .addCase(updated, (state, action) => {
        let resort = false
        action.payload.torrents.forEach((torrent) => {
          const lastState = state.torrentEntries[torrent.id]
          state.torrentEntries[torrent.id] = torrent

          if (lastState.name !== torrent.name) {
            state.toName[torrent.id] = torrent.name
          }

          const activeColumn = state.columns.activeColumn;
          if (torrentComparators[activeColumn](torrent, lastState) !== 0) {
            resort = true
          }

          const prevTState = torrentState(lastState),
                nextTState = torrentState(torrent);
          if (lastState.puddleState !== torrent.puddleState) {
            PuddleTorrentStateFlags.forEach(flag => {
              const inPrevious = (lastState.puddleState & flag) !== 0
              const inCurrent  = (torrent.puddleState   & flag) !== 0
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

        if (resort) sortByColumn(state, state.orderedTorrents)
      })
      .addCase(selected, (state, action) => {
        if (!action.payload.append) {
          Object.values(state.torrentEntries).forEach(
            (torrent) => torrent.selected = false)
        }

        action.payload.ids.forEach(
          (id) => state.torrentEntries[id].selected = true)
      })
      .addCase(columnResized, (state, action) => {
        state.columns.columns[action.payload.column].width += action.payload.delta
      })
      .addCase(filterUpdated, (state, action) => {
        if (action.payload.status)
          state.filters.state = action.payload.status!

        if (action.payload.filters) {
          if (action.payload.filters.add) {
            // TODO refactor types
            state.filters.trackers.push(action.payload.filters.add as unknown as string)
          } else if (action.payload.filters.remove) {
            arrayRemove(state.filters.trackers, action.payload.filters.remove as unknown as string)
          }
        }

        if (action.payload.query !== undefined) {
          state.filters.query = action.payload.query!
        }
      })
      .addCase(columnSelected, (state, action) => {
        if (state.columns.activeColumn === action.payload.column) {
          state.columns.isDescending = !state.columns.isDescending
        } else {
          state.columns.activeColumn = action.payload.column
        }

        sortByColumn(state, state.orderedTorrents)
      })
})

export default torrentSlice.reducer
