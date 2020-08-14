import { RootThunk } from '../state';

import * as actions from './actions';
import { generateNotification } from './utils';

import * as props from './notifications';
/* eslint-disable-next-line no-duplicate-imports */
import {
  PERSISTENT_NOTIFICATION_TYPES, Notification,
  NotificationLevel, NotificationTypes
} from './notifications'

import { Torrent } from '@client/models'

import {
  notificationsFrom,
  saveNotifications,
  deleteNotification as deleteNotificationFromSerever
} from '@server/api';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const addNotification = (notifications: Notification<any>[]) => {
  return async dispatch => {
    await dispatch(actions.notificationAdded(notifications))

    const persistentNotifications = notifications
      .filter(n => PERSISTENT_NOTIFICATION_TYPES.has(n.type))
    if (persistentNotifications.length === 0) return

    try {
      await saveNotifications(persistentNotifications)
    } catch (err) {
      // TODO notify error
      console.error(err)
    }
  }
}

export const deleteNotification = (id: string): RootThunk => {
  return async dispatch => {
    try {
      await deleteNotificationFromSerever(id)
      dispatch(actions.notificationDeleted(id))
    } catch (err) {
      // TODO notify error
      console.error(err);
    }
  }
}

export const fetchNotificationsArchive: RootThunk = async (dispatch, getState) => {
  const state = getState()
  if (state.notifications.archiveHasMore) {
    const resp = await notificationsFrom(state.notifications.inactive[0]?.id)
    if (!resp.moreExists) {
      dispatch(actions.notificationsArchiveExhausted())
    }

    dispatch(actions.notificationsFetched(resp.notifications))
  }
}

export const notifyTorrentAdded = (torrents: Torrent[]): RootThunk => {
  return dispatch => {
    const notification = generateNotification<props.TorrentAddedNotificationProps>({
      title: `Added ${torrents.length} torrents`,
      kind: NotificationLevel.INFO,
      type: NotificationTypes.TORRENT_ADDED,
      props: {
        torrents
      }
    })

    dispatch(addNotification([notification]))
  }
}

export const notifyTorrentRemoved =
  (payload: props.TorrentRemovedNotificationProps[]): RootThunk => {
    return dispatch => {
      const notifications = payload
        .map(props =>
          generateNotification<props.TorrentRemovedNotificationProps>({
            title: `Removed torrents ${props.torrent.name}.`,
            kind: NotificationLevel.INFO,
            type: NotificationTypes.TORRENT_REMOVED,
            props,
          }))

      dispatch(addNotification(notifications))
    }
  }
