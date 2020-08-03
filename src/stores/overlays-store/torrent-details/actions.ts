import { createAction } from '@reduxjs/toolkit';

export const torrentDetailsOverlayAssigned = createAction<{ torrentId: number }>('ui/set-overlay/torrent-details')
