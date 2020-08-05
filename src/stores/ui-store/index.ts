import { createSlice } from '@reduxjs/toolkit';

export * from './state';
export * from './actions';
export * from './views';
export * from './thunks';
export * from './key-commands';

import defaultState from './default';
import * as actions from './actions';

import { torrentsRemoved } from '../torrents-store/actions';
import { arrayRemove } from '@puddle/utils';

import {
  OverlayType, overlayRemoved, torrentDetailsOverlayAssigned,
  settingsOverlayAssigned, setLabelsOverlayAssigned
} from '../overlays-store';

const uiSlice = createSlice({
  name: 'ui',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actions.filterQueryUpdated, (state, action) => {
        state.selected = []
        state.filters.query = action.payload
      })
      .addCase(actions.filterClassesUpdated, (state, action) => {
        state.selected = []
        state.filters.classes = action.payload
      })
      .addCase(actions.filterTrackersUpdated, (state, action) => {
        state.selected = []
        if (action.payload.add) {
          state.filters.trackers.push(action.payload.add!)
        } else if (action.payload.remove) {
          arrayRemove(state.filters.trackers, action.payload.remove!)
        }
      })
      .addCase(actions.filterLabelsUpdated, (state, action) => {
        state.selected = []
        if (action.payload.add) {
          state.filters.labels.push(action.payload.add!)
        } else if (action.payload.remove) {
          arrayRemove(state.filters.labels, action.payload.remove!)
        }
      })
      .addCase(actions.torrentSelected, (state, action) => {
        if (!action.payload.append) {
          state.selected = action.payload.ids
        } else {
          action.payload.ids.forEach(
            (id) => state.selected.push(id))
        }
      })
      .addCase(torrentsRemoved, (state, action) => {
        action.payload.ids.forEach(id =>
          arrayRemove(state.selected, id))
      })
      .addCase(actions.viewChanged, (state, action) => {
        state.view = action.payload
      })
      .addCase(actions.allTorrentsDeselected, (state) => {
        state.selected = []
      })
      .addCase(overlayRemoved, (state) => {
        state.overlay = undefined
      })
      .addCase(settingsOverlayAssigned, (state) => {
        state.overlay = OverlayType.SETTINGS
      })
      .addCase(torrentDetailsOverlayAssigned, (state) => {
        state.overlay = OverlayType.TORRENT_DETAILS
      })
      .addCase(setLabelsOverlayAssigned, (state) => {
        state.overlay = OverlayType.SET_LABELS
      })
})

export default uiSlice.reducer
