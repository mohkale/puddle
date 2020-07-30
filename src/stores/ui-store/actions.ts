import { XOR } from 'ts-xor'
import { createAction } from '@reduxjs/toolkit';

import { Torrent } from '../torrent';
import { TorrentFields } from '../fields';
import { TorrentClasses } from '../classes';

export const filterQueryUpdated = createAction<string>('ui/filters/update-query')

export const filterClassesUpdated = createAction<TorrentClasses>('ui/filters/update-classes')

export const filterTrackersUpdated = createAction<XOR<{ add: string }, { remove: string }>>('ui/filters/update-trackers')

export const filterLabelsUpdated = createAction<XOR<{ add: string }, { remove: string }>>('ui/filters/update-labels')

/** action for selecting one or more torrents from the torrent list. */
export const torrentSelected = createAction<{ ids: number[], append?: boolean }>('torrents/select')
