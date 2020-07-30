import { XOR } from 'ts-xor'
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

/** action for selecting one or more torrents from the torrent list. */
export const torrentSelected = createAction<{ ids: number[], append?: boolean }>('torrents/select')

export const filterQueryUpdated = createAction<string>('torrents/filters/update-query')

export const filterClassesUpdated = createAction<TorrentClasses>('torrents/filters/update-classes')

export const filterTrackersUpdated = createAction<XOR<{ add: string }, { remove: string }>>('torrents/filters/update-trackers')

export const filterLabelsUpdated = createAction<XOR<{ add: string }, { remove: string }>>('torrents/filters/update-labels')

export const activeFieldChanged = createAction<{ field: TorrentFields }>('settings/column-select')
