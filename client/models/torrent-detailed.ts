/**
 * Extensions for the default torrent field in the torrents store to be able
 * to display more information about torrents to the user (in comparison to
 * the dashboard).
 */

import {
  Torrent, TORRENT_FIELDS, TORRENT_BASE, torrentFromResponse
} from './torrent'
import { TransmissionTorrent as TorrentResponse } from '@transmission';

export const TORRENT_DETAILED_FIELDS: (keyof TorrentResponse)[] = [
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
  "activityDate",
  "startDate",
]

export type TorrentDetailed = Torrent &
  Pick<TorrentResponse, 'downloadDir' | 'peers' | 'peersConnected' | 'dateCreated' |
    'hashString' | 'creator' | 'comment' | 'totalSize' | 'isPrivate' | 'errorString' |
    'files' | 'fileStats' | 'files-wanted' | 'files-unwanted' | 'priority-high' |
    'priority-low' | 'priority-normal' | 'activityDate' | 'startDate'>

const TORRENT_DETAILED_BASE: Partial<TorrentDetailed> = {
  ...TORRENT_BASE,
}

export function torrentDetailedFromResponse(resp: Partial<TorrentResponse>, prev?: TorrentDetailed): TorrentDetailed {
  const base = prev ? prev! : TORRENT_DETAILED_BASE
  const torrent = Object.assign({}, torrentFromResponse(resp), base) as TorrentDetailed

  return torrent
}
