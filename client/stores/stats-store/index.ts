import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './thunks';
export * from './state';

import * as actions from './actions';
import defaultState from './default';

const statsSlice = createSlice({
  name: 'stats',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actions.statsUpdated, (state, action) => {
        const resp = action.payload
        const currentStats = resp['current-stats']
        const totalStats = resp['cumulative-stats']

        state.download.cumulativeTotal = totalStats.downloadedBytes
        state.download.total = currentStats.downloadedBytes
        state.download.rate = resp.downloadSpeed

        state.upload.cumulativeTotal = totalStats.uploadedBytes
        state.upload.total = currentStats.uploadedBytes
        state.upload.rate = resp.uploadSpeed

        state.sessionCount = totalStats.sessionCount
        state.totalSecondsActive = totalStats.secondsActive
        state.totalSecondsActiveThisSession = currentStats.secondsActive
      })
      .addCase(actions.limitsUpdated, (state, action) => {
        const resp = action.payload
        const downloadLimitEnabled = resp['speed-limit-down-enabled'],
              uploadLimitEnabled   = resp['speed-limit-up-enabled'];

        state.download.limit = downloadLimitEnabled ? 1000 * resp['speed-limit-down'] : -1;
        state.upload.limit   = uploadLimitEnabled   ? 1000 * resp['speed-limit-up']   : -1;

        state.download.altLimit = 1000 * resp['alt-speed-down']
        state.upload.altLimit   = 1000 * resp['alt-speed-up']

        state.altEnabled = resp['alt-speed-enabled']
      })
      .addCase(actions.altSpeedToggled, (state, action) => {
        state.altEnabled = (action.payload.value === undefined) ?
          !state.altEnabled : action.payload.value
      })
})

export default statsSlice.reducer
