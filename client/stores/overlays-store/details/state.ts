import { TorrentDetailed } from '@client/models';
import { FileTreeEntry as FileTree } from '@client/utils';

export interface TorrentDetailsOverlayState {
  torrentId: number,
  torrent?: TorrentDetailed
  fileTree: {
    tree: FileTree,
    fileCount: number
  }
  selectedFiles: number[]
  selectedDirectories: string[]
}
