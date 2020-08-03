import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './state';

import defaultState from './default';
import * as actions from './actions';
import { overlayRemoved } from '../actions';

const torrentDetailsOverlaySlice = createSlice({
  name: 'torrent-details-overlay',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actions.torrentDetailsOverlayAssigned, (state, action) => {
        state.torrentId = action.payload.torrentId
      })
})

export default torrentDetailsOverlaySlice.reducer
