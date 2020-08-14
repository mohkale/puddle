import { createSlice } from '@reduxjs/toolkit';

export * from './state';
export * from './thunks';
export * from './actions';
export * from './notifications';

import defaultState from './default';
import * as actions from './actions';

import { Notification } from './notifications'

/* eslint-disable @typescript-eslint/no-explicit-any */

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actions.notificationRemoved, (state, action) => {
        const index = state.active.findIndex(o => o.id === action.payload)
        state.inactive.push(state.active[index])
        state.active = [...state.active.slice(0, index),
                        ...state.active.slice(index+1)]
      })
      .addCase(actions.notificationAdded, (state, action) => {
        const items = action.payload
        if (items[Symbol.iterator]) {
          (items as Notification<any>[])
            .forEach(item => state.active.push(item))
        } else {
          state.active.push(action.payload as Notification<any>);
        }
      })
      .addCase(actions.notificationsFetched, (state, action) => {
        state.inactive = [...action.payload, ...state.inactive]
      })
      .addCase(actions.notificationDeleted, (state, action) => {
        const inactiveIndex = state.inactive.findIndex(o => o.id === action.payload)
        if (inactiveIndex !== -1) {
          state.inactive = [...state.inactive.slice(0, inactiveIndex),
                            ...state.inactive.slice(inactiveIndex+1)]
        } else {
          const activeIndex = state.active.findIndex(o => o.id === action.payload)
          if (activeIndex !== -1) {
            state.active = [...state.inactive.slice(0, activeIndex),
                            ...state.inactive.slice(activeIndex+1)]
          }
        }
      })
      .addCase(actions.notificationsArchiveExhausted, state => {
        state.archiveHasMore = false
      })
})

export default notificationsSlice.reducer
