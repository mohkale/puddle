import { createAction } from '@reduxjs/toolkit';
import { TorrentFields } from '../fields';
import { IntervalsType } from './state';

export const columnResized  = createAction<{ field: TorrentFields, delta: number }>('settings/column-resized');

export const columnRemoved = createAction<{ field: TorrentFields }>('settings/column-removed');

export const intervalsUpdated = createAction<Partial<IntervalsType>>('settings/intervals-changed');
