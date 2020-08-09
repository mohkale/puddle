import { TorrentDetailsOverlayState } from './details';
import { SetLabelsOverlayState } from './set-labels';
import { RemoveTorrentOverlayState } from './torrent-remove';
import { SetTorrentLocationOverlayState } from './set-location';

export interface OverlaysState {
  torrentDetails: TorrentDetailsOverlayState
  setLabels: SetLabelsOverlayState
  torrentRemove: RemoveTorrentOverlayState
  setLocation: SetTorrentLocationOverlayState
}
