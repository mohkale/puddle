import { RootState } from '../state';
import { createSelector } from '@reduxjs/toolkit';
import { TorrentFields } from '@client/models';

export const selectAllColumns =
  createSelector(
    [(state: RootState) => state.settings.columns.entries],
    entries => Object.entries(entries)
      .map(([type, entry]) => ({
        type: Number(type) as TorrentFields,
        ...entry
      }))
  )

export const selectColumnSettings =
  (state: RootState) => state.settings.columns

export const selectColumnOrder =
  (state: RootState) => state.settings.columns.order

export const selectColumns = createSelector(
  [(state: RootState) => state.settings.columns,
   (state: RootState) => state.torrents.activeField],
  (columns, activeColumn) =>
    columns.order.map(key => {
      const entry = columns.entries[key]
      const isActive = activeColumn === key

      return {
        ...entry,
        isActive,
        field: key,
      }
    })
)
