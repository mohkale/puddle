import { createAction } from '@reduxjs/toolkit';

export const overlayRemoved = createAction('ui/remove-overlay')

export const settingsOverlayAssigned = createAction('ui/set-overlay/settings')

export const statisticsOverlayAssigned = createAction('ui/set-overlay/statistics')

export const addTorrentOverlayAssigned = createAction('ui/set-overlay/torrent-add')

export const notificationsOverlayAssigned = createAction('ui/set-overlay/notifications')
