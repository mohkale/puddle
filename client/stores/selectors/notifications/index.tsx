import { RootState } from '../../state';
import { createSelector } from '@reduxjs/toolkit';

export const selectNotifications =
  createSelector(
    [(state: RootState) => state.notifications.active,
     (state: RootState) => state.notifications.inactive],
    (active, inactive) => [...inactive, ...active].reverse())

export const selectNotificationsArchiveHasMore =
  (state: RootState) => state.notifications.archiveHasMore
