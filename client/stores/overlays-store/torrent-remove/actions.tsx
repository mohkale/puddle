import { createAction } from '@reduxjs/toolkit';

export const removeTorrentOverlayAssigned = createAction<number[]>('ui/set-overlay/torrent-remove')
