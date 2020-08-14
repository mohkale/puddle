import { settingsUpdated } from './actions';

import { RootThunk } from '../state';
import { ColumnType, IntervalsType } from './state';

import { syncSettings } from '@server/api';

interface _SettingsUpdatedProps {
  columnWidths: { [key in ColumnType]: number }
  columnOrder: ColumnType[]
  intervals: IntervalsType
}

export type SettingsUpdatedProps = Partial<_SettingsUpdatedProps>

export const updateSettings = (props: SettingsUpdatedProps, sync: boolean): RootThunk => {
  return async dispatch => {
    dispatch(settingsUpdated(props))

    if (sync) {
      await syncSettings(props)
    }
  }
}
