import { createAction } from '@reduxjs/toolkit';
import { TorrentFields } from '@puddle/models';
import { IntervalsType } from './state';
import {
  TransmissionSession as Session,
} from '@puddle/transmission';

export const columnResized  = createAction<{ field: TorrentFields, delta: number }>('settings/column-resized');

export const sessionUpdated = createAction<Session>('settings/update-session')

export const columnRemoved = createAction<{ field: TorrentFields }>('settings/column-removed');

export const intervalsUpdated = createAction<Partial<IntervalsType>>('settings/intervals-changed');
