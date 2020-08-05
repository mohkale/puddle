import { RootState } from '../state';
import { createSelector } from '@reduxjs/toolkit';

export const selectLabelsById = (ids: number[]) =>
  createSelector(
    [(state: RootState) => state.torrents.entries],
    // TODO only rerender when tags have changed.
    (entries) => {
      const idsWithLabels = Object.entries(entries)
        .filter(([id]) => ids.includes(Number(id)))
        .map(([id, val]) => [id, val.labels])

      return Object.fromEntries(idsWithLabels);
    }
  )
