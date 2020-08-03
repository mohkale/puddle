/**
 * Extensions for the default torrent field in the torrents store to be able
 * to display more information about torrents to the user (in comparison to
 * the dashboard).
 */

import {
  Torrent, TORRENT_FIELDS, TORRENT_BASE, fromResponse as torrentFromResponse
} from '@puddle/stores/torrent'
import { TransmissionTorrent as TorrentResponse } from '@puddle/transmission';

export const TORRENT_FULL_FIELDS: (keyof TorrentResponse)[] = [
  ...TORRENT_FIELDS,
  "downloadDir",
  "peers",
  "peersConnected",
  "dateCreated",
  "hashString",
  "creator",
  "comment",
  "totalSize",
  "isPrivate",
  "errorString",
  "files",
  "fileStats",
  "files-wanted",
  "files-unwanted",
  "priority-high",
  "priority-low",
  "priority-normal",
]

export type TorrentFull = Torrent &
  Pick<TorrentResponse, 'downloadDir' | 'peers' | 'peersConnected' | 'dateCreated' |
    'hashString' | 'creator' | 'comment' | 'totalSize' | 'isPrivate' | 'errorString' |
    'files' | 'fileStats' | 'files-wanted' | 'files-unwanted' | 'priority-high' |
    'priority-low' | 'priority-normal'>

const TORRENT_FULL_BASE: Partial<TorrentFull> = {
  ...TORRENT_BASE,
}

export function fromResponse(resp: Partial<TorrentResponse>, prev?: TorrentFull): TorrentFull {
  const base = prev ? prev! : TORRENT_FULL_BASE
  const torrent = Object.assign({}, torrentFromResponse(resp), base) as TorrentFull

  return torrent
}
