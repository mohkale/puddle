import { XOR } from 'ts-xor'
import { createAction } from '@reduxjs/toolkit';

import { ViewType } from './views';
import { OverlayType } from './overlays';
import { TorrentClasses } from '../classes';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const filterQueryUpdated = createAction<string>('ui/filters/update-query')

export const filterClassesUpdated = createAction<TorrentClasses>('ui/filters/update-classes')

export const filterTrackersUpdated = createAction<XOR<{ add: string }, { remove: string }>>('ui/filters/update-trackers')

export const filterLabelsUpdated = createAction<XOR<{ add: string }, { remove: string }>>('ui/filters/update-labels')

/** action for selecting one or more torrents from the torrent list. */
export const torrentSelected = createAction<{ ids: number[], append?: boolean }>('ui/torrents/select')

export const allTorrentsDeselected = createAction('ui/torrents/deselect-all')

export const viewChanged = createAction<{ type: ViewType, [key: string]: any }>('ui/view-change')

export const overlayAssigned = createAction<OverlayType|undefined>('ui/set-overlay')
