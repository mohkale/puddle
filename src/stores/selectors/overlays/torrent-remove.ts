import { RootState } from '../../state';

export const selectRemoveTorrentOverlayTorrentIds =
  (state: RootState) => state.overlays.torrentRemove.ids
