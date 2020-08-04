import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './state';
export * from './thunks';

import defaultState from './default';
import * as actions from './actions';
import { overlayRemoved } from '../actions';

const torrentDetailsOverlaySlice = createSlice({
  name: 'torrent-details-overlay',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(overlayRemoved, (state, action) => {
        Object.assign(state, defaultState);
      })
      .addCase(actions.torrentDetailsOverlayAssigned, (state, action) => {
        state.torrentId = action.payload.torrentId
      })
      .addCase(actions.torrentDetailsOverlayTorrentUpdated, (state, action) => {
        state.torrent = action.payload
      })
      .addCase(actions.torrentDetailsOverlayTorrentAssigned, (state, action) => {
        Object.assign(state.torrent, action.payload)
      })
      .addCase(actions.torrentDetailsOverlaySelectFiles, (state, action) => {
        state.selectedFiles = [...state.selectedFiles, ...action.payload]
      })
      .addCase(actions.torrentDetailsOverlayDeselectFiles, (state, action) => {
        // WARN unoptomized search based solution.
        state.selectedFiles = state.selectedFiles.filter(id => !action.payload.includes(id))
      })
      .addCase(actions.torrentDetailsOverlayClearFileSelection, (state, action) => {
        state.selectedFiles = []
      })
})

export default torrentDetailsOverlaySlice.reducer
