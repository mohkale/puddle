import { createAction } from '@reduxjs/toolkit';
import { TorrentDetailsOverlayState } from './state';
import { TorrentDetailed } from '@puddle/models';

type TorrentDetailsOverlayProps = Pick<TorrentDetailsOverlayState, 'torrentId' | 'torrent'>

export const torrentDetailsOverlayAssigned = createAction<{ torrentId: number }>('ui/set-overlay/torrent-details')

export const torrentDetailsOverlayTorrentUpdated = createAction<TorrentDetailed>('ui/set-overlay/torrent-details/torrent')
