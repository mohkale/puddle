import { createAction } from '@reduxjs/toolkit';
import { TorrentFields } from '../fields';

export const columnResized  = createAction<{ field: TorrentFields, delta: number }>('settings/column-resized');

export const columnRemoved = createAction<{ field: TorrentFields }>('settings/column-removed');
