import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './state';
export * from './thunks';

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
      .addCase(actions.sessionUpdated, (state, action) => {
        state.transmission = action.payload
      })
      .addCase(actions.settingsUpdated, (state, action) => {
        if (action.payload.columnWidths) {
          Object.entries(action.payload.columnWidths)
            .forEach(([column, value]) => {
              state.columns.entries[column].width = value
            })
        }

        if (action.payload.columnOrder) {
          state.columns.order = action.payload.columnOrder
        }

        if (action.payload.intervals) {
          state.intervals = {...state.intervals, ...action.payload.intervals}
        }
      })
})

export default settingsSlice.reducer
