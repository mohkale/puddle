import { TorrentFull } from '../../torrent-full';

export interface TorrentDetailsOverlayState {
  torrentId: number,
  torrent?: TorrentFull
  // files: any // TODO torrent files
  // fileStats: any // TODO torrent file stats
  selectedFiles: number[] // files that've been selected
}
