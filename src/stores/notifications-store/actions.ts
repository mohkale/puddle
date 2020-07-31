import { createAction } from '@reduxjs/toolkit';
import * as props from './notifications/types'

export const notificationRemoved = createAction<number>('notification/removed')

export const notifyTorrentAdded = createAction<{ ids: number[] }>('notification/torrent-added')

export const notifyTorrentRemoved = createAction<props.TorrentRemovedNotificationProps[]>('notification/torrent-removed')
