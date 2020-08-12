import { RootState } from '../state';
import { createSelector } from '@reduxjs/toolkit';

export const selectColumnSettings =
  (state: RootState) => state.settings.columns

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
