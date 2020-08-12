import { createAction } from '@reduxjs/toolkit';

import { ColumnType } from './state';
import { SettingsUpdatedProps } from './thunks';

import { TransmissionSession as Session } from '@transmission';

export const columnResized  = createAction<{ field: ColumnType, delta: number }>('settings/column-resized');

export const sessionUpdated = createAction<Session>('settings/update-session')

export const settingsUpdated = createAction<SettingsUpdatedProps>('settings/updated')
