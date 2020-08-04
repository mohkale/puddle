import { createAction } from '@reduxjs/toolkit';
import { TorrentDetailsOverlayState } from './state';
import { TorrentFull } from '../../torrent-full';

type TorrentDetailsOverlayProps = Pick<TorrentDetailsOverlayState, 'torrentId' | 'torrent'>

export const torrentDetailsOverlayAssigned = createAction<{ torrentId: number }>('ui/set-overlay/torrent-details')

export const torrentDetailsOverlayTorrentUpdated = createAction<TorrentFull>('ui/set-overlay/torrent-details/torrent')
