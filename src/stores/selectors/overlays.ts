import { RootState } from '../state';

export const selectTorrentDetailsOverlayTorrentId =
  (state: RootState) => state.overlays.torrentDetails.torrentId
