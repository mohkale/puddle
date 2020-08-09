import { createAction } from '@reduxjs/toolkit';

export const setTorrentLocationOverlayAssigned = createAction<number[]>('ui/set-overlay/set-location')
