import { RootState } from '../state';
import { createSelector } from '@reduxjs/toolkit';

export * from './columns';
export * from './filter-lists';
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
