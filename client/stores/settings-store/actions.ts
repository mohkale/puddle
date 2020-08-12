import { createAction } from '@reduxjs/toolkit';
import { ColumnType, IntervalsType } from './state';
import {
  TransmissionSession as Session,
} from '@transmission';

export const columnResized  = createAction<{ field: ColumnType, delta: number }>('settings/column-resized');

export const sessionUpdated = createAction<Session>('settings/update-session')

export const columnRemoved = createAction<{ field: ColumnType }>('settings/column-removed');

export const intervalsUpdated = createAction<Partial<IntervalsType>>('settings/intervals-changed');

interface ColumnUpdatedProps {
  widths: { [key in ColumnType]: number }
  order: ColumnType[]
  visibility: ColumnType[]
}

export const columnsUpdated = createAction<ColumnUpdatedProps>('settings/column-updated')
