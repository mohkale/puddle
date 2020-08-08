import { RootState } from '../state';
import { createSelector } from '@reduxjs/toolkit';

export const selectLocationById = (ids: number[]) =>
  createSelector(
    [(state: RootState) => state.torrents.entries],
    // TODO only rerender when ids have changed.
    (entries) => {
      const idsWithLocation = Object.entries(entries)
        .filter(([id]) => ids.includes(Number(id)))
        .map(([id, val]) => [id, val.downloadDir])

      return Object.fromEntries(idsWithLocation);
    }
  )
