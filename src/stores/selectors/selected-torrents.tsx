import { RootState } from '../state';
import { createSelector } from '@reduxjs/toolkit';

const selectSelectedTorrentsSet =
  createSelector(
    [(state: RootState) => state.ui.selected],
    (selected) => {
      if (selected.length === 0) {
        return () => false
      }

      const selectedTorrents = new Set(selected)
      return (id: number) => selectedTorrents.has(id)
    }
  )

export const selectSelectedTorrentIds =
  (state: RootState) => state.ui.selected

export const selectSelectedTorrents =
  createSelector(
    [(state: RootState) => state.torrents.entries,
     selectSelectedTorrentsSet],
    (torrents, isSelected) => Object.values(torrents)
      .filter(torrent => isSelected(torrent.id)))

export const selectTorrentIsSelected = (id: number) =>
  createSelector(
    [selectSelectedTorrentsSet],
    (isSelected) => isSelected(id))

export const selectSelectedTorrentCount =
  createSelector(
    [selectSelectedTorrentIds],
    (selected) => selected.length)
