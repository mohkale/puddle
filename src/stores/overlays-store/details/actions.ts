import { createAction } from '@reduxjs/toolkit';

import { TorrentDetailed } from '@puddle/models';
import { TorrentDetailsOverlayState } from './state';

type TorrentDetailsOverlayProps = Pick<TorrentDetailsOverlayState, 'torrentId' | 'torrent'>

export const torrentDetailsOverlayAssigned = createAction<{ torrentId: number }>('ui/set-overlay/torrent-details')

export const torrentDetailsOverlayTorrentUpdated = createAction<TorrentDetailed>('ui/set-overlay/torrent-details/torrent')

export const torrentDetailsOverlayTorrentAssigned = createAction<Partial<TorrentDetailed>>('ui/set-overlay/torrent-details/torrent-priority')

export const torrentDetailsOverlaySelectFiles = createAction<number[]>('ui/set-overlay/torrent-details/select-files')

export const torrentDetailsOverlayDeselectFiles = createAction<number[]>('ui/set-overlay/torrent-details/deselect-files')

export const torrentDetailsOverlayClearFileSelection = createAction('ui/set-overlay/torrent-details/clear-files')
