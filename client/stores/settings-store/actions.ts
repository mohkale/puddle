import { createAction } from '@reduxjs/toolkit';
import { TorrentFields } from '@client/models';
import { IntervalsType } from './state';
import {
  TransmissionSession as Session,
} from '@transmission';

export const columnResized  = createAction<{ field: TorrentFields, delta: number }>('settings/column-resized');

export const sessionUpdated = createAction<Session>('settings/update-session')

export const columnRemoved = createAction<{ field: TorrentFields }>('settings/column-removed');

export const intervalsUpdated = createAction<Partial<IntervalsType>>('settings/intervals-changed');

interface ColumnUpdatedProps {
  widths: { [key in TorrentFields]: number }
  order: TorrentFields[]
  visibility: TorrentFields[]
}

export const columnsUpdated = createAction<ColumnUpdatedProps>('settings/column-updated')
