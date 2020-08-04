import { RootState } from '../state';

export const selectTorrentDetailsOverlayTorrentId =
  (state: RootState) => state.overlays.torrentDetails.torrentId

export const selectTorrentDetailsOverlayTorrent =
  (state: RootState) => state.overlays.torrentDetails.torrent
