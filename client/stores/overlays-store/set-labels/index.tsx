import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './state';

import defaultState from './default';
import * as actions from './actions';
import { overlayRemoved } from '../actions';

const setLabelsOverlaySlice = createSlice({
  name: 'set-tags-overlay',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(overlayRemoved, (state) => {
        Object.assign(state, defaultState);
      })
      .addCase(actions.setLabelsOverlayAssigned, (state, action) => {
        state.ids = action.payload
      })
})

export default setLabelsOverlaySlice.reducer
