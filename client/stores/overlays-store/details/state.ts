import { TorrentDetailed } from '@client/models';

export interface TorrentDetailsOverlayState {
  torrentId: number,
  torrent?: TorrentDetailed
  selectedFiles: number[]
}
