import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './state';
export * from './thunks';

import defaultState from './default';
import * as actions from './actions';

import {
  torrentClass, TorrentClasses, TorrentClassFlags
} from '../classes';

import { torrentComparators } from '../fields';
import {
  sortByColumn,
  addTorrentToTracker, removeTorrentFromTracker,
  addTorrentToLabel, removeTorrentFromLabel
} from './utils';

import { arrayRemove } from '@puddle/utils';
import { setPartition } from '@puddle/utils';

const torrentSlice = createSlice({
  name: 'torrents',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actions.torrentsAdded, (state, action) => {
        action.payload.torrents.forEach(torrent => {
          state.ids.push(torrent.id)
          state.entries[torrent.id] = torrent

          state.ordered.push(torrent.id)
          state.toName[torrent.id] = torrent.name

          TorrentClassFlags.forEach(flag => {
            if ((flag & torrent.classes) !== 0) {
              state.byClass[flag].push(torrent.id)
            }
          })

          torrent.trackers.forEach(tracker =>
            addTorrentToTracker(state, tracker.announce, torrent.id))

          torrent.labels.forEach(label =>
            addTorrentToLabel(state, label, torrent.id))
        })

        sortByColumn(state, state.ordered)
      })
      .addCase(actions.torrentsRemoved, (state, action) => {
        action.payload.ids.forEach(id => {
          const index = state.ids.indexOf(id)
          if (index !== -1) {
            const torrent = state.entries[id]
            state.ids.splice(index, 1)
            delete state.toName[torrent.id]

            arrayRemove(state.ordered, id)

            TorrentClassFlags.forEach(flag => {
              if ((flag & torrent.classes) !== 0) {
                arrayRemove(state.byClass[flag], id)
              }
            })

            delete state.entries[id]
            torrent.trackers.forEach(tracker =>
              removeTorrentFromTracker(state, tracker.announce, id))
            torrent.labels.forEach(label =>
              removeTorrentFromLabel(state, label, id))
          }
        })
      })
      .addCase(actions.torrentsUpdated, (state, action) => {
        let resort = false
        action.payload.torrents.forEach((torrent) => {
          const lastState = state.entries[torrent.id]
          state.entries[torrent.id] = torrent

          if (lastState.name !== torrent.name) {
            state.toName[torrent.id] = torrent.name
          }

          const activeField = state.activeField;
          if (torrentComparators[activeField](torrent, lastState) !== 0) {
            // the field we're sorting by has been changed in the current
            // torrent, so we have to resort.
            // NOTE we may be able to just reposition the current torrent
            // to where it should be instead of resorting everything.
            resort = true
          }

          if (lastState.classes !== torrent.classes) {
            TorrentClassFlags.forEach(flag => {
              const inPrevious = (lastState.classes & flag) !== 0
              const inCurrent  = (torrent.classes   & flag) !== 0

              if (inPrevious !== inCurrent) {
                if (inPrevious) { // but not in current
                  arrayRemove(state.byClass[flag], torrent.id)
                } else { // inCurrent but not in previous
                  state.byClass[flag].push(torrent.id)
                }
              }
            })
          }

          const [removedTrackers, addedTrackers] = setPartition(
            lastState.trackers.map(t => t.announce),
            torrent.trackers.map(t => t.announce))
          removedTrackers.forEach(tracker => removeTorrentFromTracker(state, tracker, torrent.id))
          addedTrackers.forEach(tracker => addTorrentToTracker(state, tracker, torrent.id))

          const [removedLabels, addedLabels] = setPartition(lastState.labels, torrent.labels)
          removedLabels.forEach(label => removeTorrentFromLabel(state, label, torrent.id))
          addedLabels.forEach(label => addTorrentToLabel(state, label, torrent.id))
        })

        if (resort) sortByColumn(state, state.ordered)
      })
      .addCase(actions.torrentSelected, (state, action) => {
        if (!action.payload.append) {
          Object.values(state.entries).forEach(
            (torrent) => torrent.selected = false)
        }

        action.payload.ids.forEach(
          (id) => state.entries[id].selected = true)
      })
      .addCase(actions.activeFieldChanged, (state, action) => {
        if (state.activeField === action.payload.field) {
          state.showDescending = !state.showDescending
          state.ordered.reverse()
        } else {
          state.activeField = action.payload.field
        }

        sortByColumn(state, state.ordered)
      })
      .addCase(actions.filterQueryUpdated, (state, action) => {
        state.filters.query = action.payload
      })
      .addCase(actions.filterClassesUpdated, (state, action) => {
        state.filters.classes = action.payload
      })
      .addCase(actions.filterTrackersUpdated, (state, action) => {
        if (action.payload.add) {
          state.filters.trackers.push(action.payload.add!)
        } else if (action.payload.remove) {
          arrayRemove(state.filters.trackers, action.payload.remove!)
        }
      })
      .addCase(actions.filterLabelsUpdated, (state, action) => {
        if (action.payload.add) {
          state.filters.labels.push(action.payload.add!)
        } else if (action.payload.remove) {
          arrayRemove(state.filters.labels, action.payload.remove!)
        }
      })
})

export default torrentSlice.reducer
