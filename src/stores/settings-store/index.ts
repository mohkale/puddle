import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './state';

import defaultState from './default';
import * as actions from './actions';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actions.columnResized, (state, action) => {
        state.columns.entries[action.payload.field].width += action.payload.delta
      })
      .addCase(actions.intervalsUpdated, (state, action) => {
        state.intervals = {...state.intervals, ...action.payload}
      })
      .addCase(actions.sessionUpdated, (state, action) => {
        state.transmission = action.payload
      })
})

export default settingsSlice.reducer
