import { createAction } from '@reduxjs/toolkit';

import { TorrentDetailed } from '@client/models';
import { TorrentDetailsOverlayState } from './state';

type TorrentDetailsOverlayProps = Pick<TorrentDetailsOverlayState, 'torrentId' | 'torrent'>

export const torrentDetailsOverlayAssigned = createAction<{ torrentId: number }>('ui/set-overlay/torrent-details')

export const torrentDetailsOverlayTorrentUpdated = createAction<TorrentDetailed>('ui/set-overlay/torrent-details/torrent')

export const torrentDetailsOverlayTorrentAssigned = createAction<Partial<TorrentDetailed>>('ui/set-overlay/torrent-details/torrent-priority')

export const torrentDetailsOverlaySelectDirectory = createAction<string>('ui/set-overlay/torrent-details/select-directory')

export const torrentDetailsOverlayDeselectDirectory = createAction<string>('ui/set-overlay/torrent-details/deselect-directory')

export const torrentDetailsOverlaySelectFiles = createAction<{ id: number, path: string }>('ui/set-overlay/torrent-details/select-files')

export const torrentDetailsOverlayDeselectFiles = createAction<{ id: number, path: string }>('ui/set-overlay/torrent-details/deselect-files')

export const torrentDetailsOverlayClearFileSelection = createAction('ui/set-overlay/torrent-details/clear-files')
