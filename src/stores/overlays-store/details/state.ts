import { TorrentDetailed } from '@puddle/models';

export interface TorrentDetailsOverlayState {
  torrentId: number,
  torrent?: TorrentDetailed
  selectedFiles: number[]
}
