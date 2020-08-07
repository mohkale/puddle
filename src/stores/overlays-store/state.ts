import { TorrentDetailsOverlayState } from './details';
import { SetLabelsOverlayState } from './set-labels';
import { RemoveTorrentOverlayState } from './torrent-remove';

export interface OverlaysState {
  torrentDetails: TorrentDetailsOverlayState
  setLabels: SetLabelsOverlayState
  torrentRemove: RemoveTorrentOverlayState
}
