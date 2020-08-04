import { createAction } from '@reduxjs/toolkit';

import { Torrent, TorrentFields } from '@puddle/models';
import {
  TransmissionPriorityType as TorrentPriority
} from '@puddle/transmission';

/** action for when we're updating one or more torrents. */
export const torrentsUpdated = createAction<{ torrents: Torrent[] }>('torrents/updated')

/** action for when one or more new torrents have been added. */
export const torrentsAdded = createAction<{ torrents: Torrent[] }>('torrents/added')

/** action for when one or more torrents have been removed. */
export const torrentsRemoved = createAction<{ ids: number[] }>('torrents/removed')

export const activeFieldChanged = createAction<{ field: TorrentFields }>('settings/column-select')

// updaters for specific fields in a torrent.
export const torrentPriorityChanged = createAction<{ ids: number[], priority: TorrentPriority }>('torrents/priority-updated')
