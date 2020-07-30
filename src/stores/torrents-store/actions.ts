import { createAction } from '@reduxjs/toolkit';

import { Torrent } from '../torrent';
import { TorrentFields } from '../fields';
import { TorrentClasses } from '../classes';

/** action for when we're updating one or more torrents. */
export const torrentsUpdated = createAction<{ torrents: Torrent[] }>('torrents/updated')

/** action for when one or more new torrents have been added. */
export const torrentsAdded = createAction<{ torrents: Torrent[] }>('torrents/added')

/** action for when one or more torrents have been removed. */
export const torrentsRemoved = createAction<{ ids: number[] }>('torrents/removed')

export const activeFieldChanged = createAction<{ field: TorrentFields }>('settings/column-select')
