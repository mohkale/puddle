import { TorrentDetailed } from '@puddle/models';

export interface TorrentDetailsOverlayState {
  torrentId: number,
  torrent?: TorrentDetailed
  // files: any // TODO torrent files
  // fileStats: any // TODO torrent file stats
  selectedFiles: number[] // files that've been selected
}
