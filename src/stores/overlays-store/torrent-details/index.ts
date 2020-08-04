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
})

export default torrentDetailsOverlaySlice.reducer
