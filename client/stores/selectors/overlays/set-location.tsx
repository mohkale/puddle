import { RootState } from '../../state';

export const selectSetLocationOverlayTorrentIds =
  (state: RootState) => state.overlays.setLocation.ids
