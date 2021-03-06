import { TorrentDetailed } from '@client/models';
import { RootState, selectTorrentDetailsOverlayTorrent } from '@client/stores';

/**
 * Utility selector for extracting the torrent instance associated with
 * this overlay and then passing through {@code selector} to extract a
 * torrent field.
 */
export function torrentSelector<T>(selector: (t: TorrentDetailed) => T) {
  return (state: RootState) =>
    selector(selectTorrentDetailsOverlayTorrent(state)!)
}
