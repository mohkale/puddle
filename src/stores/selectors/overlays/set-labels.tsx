import { RootState } from '../../state';

export const selectSetLabelsOverlayTorrentIds =
  (state: RootState) => state.overlays.setLabels.ids
