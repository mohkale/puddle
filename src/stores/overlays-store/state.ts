import { TorrentDetailsOverlayState } from './torrent-details';
import { SetLabelsOverlayState } from './set-labels';

export interface OverlaysState {
  torrentDetails: TorrentDetailsOverlayState
  setLabels: SetLabelsOverlayState
}
