import { RootState } from '../state';
import { extractHostname } from '@puddle/utils';
import { createSelector } from '@reduxjs/toolkit';

export const selectTorrentTrackersWithMeta =
  createSelector(
    [(state: RootState) => state.torrents.byTracker,
     (state: RootState) => state.torrents.filters.trackers],

    (trackers, _activeTrackers) => {
      const activeTrackers = new Set(_activeTrackers);

      return Object.entries(trackers)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([tracker, torrents]) => {
          return {
            tracker,
            hostname: extractHostname(tracker),
            count: torrents.length,
            isActive: activeTrackers.has(tracker)
          }
        })
    }
  )

export const selectTorrentByClassWithMeta =
  createSelector(
    [(state: RootState) => state.torrents.byClass,
     (state: RootState) => state.torrents.filters.classes],
    (byClass, activeClass) => [byClass, activeClass])

export const selectTorrentByLabelsWithMeta =
  createSelector(
    [(state: RootState) => state.torrents.byLabels,
     (state: RootState) => state.torrents.filters.labels],
    (byLabels, _activeLabels) => {
      const activeLabels = new Set(_activeLabels)

      return Object.entries(byLabels)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([label, torrents]) => {
          return {
            label: label,
            count: torrents.length,
            isActive: activeLabels.has(label)
          }
        })
    }
  )
