import { RootState } from '../state';
import { createSelector } from '@reduxjs/toolkit';

export * from './columns';
export * from './overlays';
export * from './filter-lists';
export * from './labels-by-id';
export * from './selected-torrents';
export * from './filtered-torrents';

import { TorrentId } from '@puddle/transmission';

export const selectColumnIsDescending = (state: RootState) =>
  state.torrents.showDescending

export const selectTorrentById = (id: TorrentId) =>
  (state: RootState) => state.torrents.entries[id]

export const selectAltSpeedEnabled =
  (state: RootState) => state.stats.altEnabled

export const selectNetworkDownloadStats =
  (state: RootState) => state.stats.download

export const selectNetworkUploadStats =
  (state: RootState) => state.stats.upload

export const selectFilterQuery =
  (state: RootState) => state.ui.filters.query

export const selectCurrentView =
  (state: RootState) => state.ui.view

export const selectNotifications =
  (state: RootState) => state.notifications.active

export const selectOverlay =
  (state: RootState) => state.ui.overlay

export const selectIntervals =
  (state: RootState) => state.settings.intervals

export const selectTorrentLabels =
  createSelector(
    [(state: RootState) => state.torrents.byLabels],
    Object.keys
  )

export const selectSettingsSession =
  (state: RootState) => state.settings.transmission
