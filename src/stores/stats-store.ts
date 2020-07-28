import { createSlice, createAction } from '@reduxjs/toolkit';
import Transmission from '@puddle/transmission';
import TransmissionSessionType from '@puddle/transmission/responses/session';
import TransmissionSessionStatsType from '@puddle/transmission/responses/session-stats';

export interface NetworkStats {
  /** maximum transfer rate in bytes per second */
  rate:  number

  /** total number of bytes transferred this session */
  total: number

  /** maxmimm possible value for {@code rate} */
  limit: number

  /** maximum possible value for {@code rate} when alt speed is active. */
  altLimit: number
}

export interface StatsState {
  /** Network stats for downloading. */
  download: NetworkStats

  /** Network stats for uploading. */
  upload:   NetworkStats

  /** Whether alternative download settings are enabled. */
  altEnabled: boolean
}

const defaultState: StatsState = {
  download: { rate: 0, total: 0, limit: -1, altLimit: -1 },
  upload:   { rate: 0, total: 0, limit: -1, altLimit: -1 },
  altEnabled: false,
}

export const statsUpdated = createAction<TransmissionSessionStatsType>('stats/update-stats')
export const limitsUpdated = createAction<TransmissionSessionType>('stats/update-limits')

export const altSpeedToggled = createAction<{ value: boolean }>('stats/alt-speed-toggled')

export const syncStats =
  (client: Transmission, callback?: VoidFunction) => {
    return async (dispatch, getState) => {
      const resp = await client.sessionStats()
      dispatch(statsUpdated(resp))
    }
  }

export const syncStatsLimits =
  (client: Transmission, callback?: VoidFunction) => {
    return async (dispatch, getState) => {
      const resp = await client.session()
      dispatch(limitsUpdated(resp))
    }
  }

const statsSlice = createSlice({
  name: 'stats',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(statsUpdated, (state, action) => {
        const resp = action.payload
        const currentStats = resp['current-stats']

        state.download.total = currentStats.downloadedBytes
        state.download.rate = resp.downloadSpeed
        state.upload.total = currentStats.uploadedBytes
        state.upload.rate = resp.uploadSpeed
      })
      .addCase(limitsUpdated, (state, action) => {
        const resp = action.payload
        const downloadLimitEnabled = resp['speed-limit-down-enabled'],
              uploadLimitEnabled   = resp['speed-limit-up-enabled'];

        state.download.limit = downloadLimitEnabled ? 1000 * resp['speed-limit-down'] : -1;
        state.upload.limit   = uploadLimitEnabled   ? 1000 * resp['speed-limit-up']   : -1;

        state.download.altLimit = 1000 * resp['alt-speed-down']
        state.upload.altLimit   = 1000 * resp['alt-speed-up']

        state.altEnabled = resp['alt-speed-enabled']
      })
      .addCase(altSpeedToggled, (state, action) => {
        state.altEnabled = (action.payload.value === undefined) ?
          !state.altEnabled : action.payload.value
      })
})

export default statsSlice.reducer
