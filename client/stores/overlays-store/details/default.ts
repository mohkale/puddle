import { TorrentDetailsOverlayState } from './state';

const defaultState: TorrentDetailsOverlayState = {
  torrentId: -1,
  torrent: undefined,
  fileTree: {
    tree: {},
    fileCount: 0,
  },
  selectedFiles: [],
  selectedDirectories: [],
}

export default defaultState
