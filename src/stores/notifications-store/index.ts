import { createSlice } from '@reduxjs/toolkit';

export * from './state';
export * from './actions';
export * from './notifications';

import defaultState from './default';
import * as actions from './actions';

import { NotificationLevel, NotificationTypes } from './notifications'

import * as props from './notifications/types'

import { generateNotification } from './utils';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actions.notificationRemoved, (state, action) => {
        state.active = state.active.filter((entry) => {
          return entry.id !== action.payload
        })
      })
      .addCase(actions.notifyTorrentAdded, (state, action) => {
        state.active.push(generateNotification<props.TorrentAddedNotificationProps>({
          title: `Added ${action.payload.ids.length} torrents`,
          kind: NotificationLevel.INFO,
          type: NotificationTypes.TORRENT_ADDED,
          props: {
            count: action.payload.ids.length
          }
        }))
      })
      .addCase(actions.notifyTorrentRemoved, (state, action) => {
        action.payload.forEach(props => {
          state.active.push(generateNotification<props.TorrentRemovedNotificationProps>({
            title: `Removed torrents ${props.name}.`,
            kind: NotificationLevel.INFO,
            type: NotificationTypes.TORRENT_REMOVED,
            props,
          }))
        })
      })
})

export default notificationsSlice.reducer
