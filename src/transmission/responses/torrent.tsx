// see [[https://github.com/transmission/transmission/blob/master/libtransmission/transmission.h#L1649][transmission.h]].
export enum TransmissionTorrentStatus {
  STOPPED       = 0,
  CHECK_WAIT    = 1,
  CHECK         = 2,
  DOWNLOAD_WAIT = 3,
  DOWNLOAD      = 4,
  SEED_WAIT     = 5,
  SEED          = 6
}

export interface TransmissionTorrentFiles {
  bytesCompleted: number
  length: number
  name: string
}

export interface TransmissionTorrentFileStats {
  bytesCompleted: number
  wanted: boolean
  priority: number
}

export interface TransmissionTorrentPeers {
  address: string
  clientName: string
  clientIsChoked: boolean
  clientIsInterested: boolean
  flagStr: string
  isDownloadingFrom: boolean
  isEncrypted: boolean
  isIncoming: boolean
  isUploadingTo: boolean
  isUTP: boolean
  peerIsChoked: boolean
  peerIsInterested: boolean
  port: number
  progress: number
  rateToClient: number
  rateToPerr: number
}

export interface TransmissionTorrentPeersFrom {
  fromCache: number
  fromDht: number
  fromIncoming: number
  fromLpd: number
  fromLtep: number
  fromPex: number
  fromTracker: number
}

export type TransmissionTorrentPieces = string

export interface TransmissionTorrentTrackers {
  announce: string
  id: number
  scrape: string
  tier: number
}

export interface TransmissionTorrentTrackerStats {
  announce: string
  announceState: number
  downloadCount: number
  hasAnnounced: boolean
  hasScraped: boolean
  host: string
  id: number
  isBackup: boolean
  lastAnnouncePeerCount: number
  lastAnnounceResult: string
  lastAnnounceStartTime: number
  lastAnnounceSucceeded: boolean
  lastAnnounceTime: number
  lastAnnounceTimedOut: boolean
  lastScrapeResult: string
  lastScrapeStartTime: number
  lastScrapeSucceeded: boolean
  lastScrapeTime: number
  lastScrapeTimedOut: boolean
  leecherCount: number
  nextAnnounceTime: number
  nextScrapeTime: number
  scrape: string
  scrapeState: number
  seederCount: number
  tier: number
}

type TransmissionPriorityType = 1 | 0 | -1;

/**
 * Fields that you can assign using the torrent-set method
 * but you can't retrieve using the torrent-get method.
 *
 * You can access the relevent information using the other
 * fields of the torrent-get method, attempting to access
 * any of these will just return 0 for them.
 */
export interface TransmissionTorrent_WriteOnly {
  "files-wanted": number[]
  "files-unwanted": number[]
  "location": string
  "priority-high": number[]
  "priority-low": number[]
  "priority-normal": number[]
  "trackerAdd": string[]
  "trackerRemove": number[]
  "trackerReplace": { [id: number]: string }
}

/**
 * Fields of {@code TransmissionTorrentType} that can be modified
 * using the torrent-set method. Write only fields can also be found
 * in {@code TransmissionTorrent_WriteOnly}. Any other fields are
 * read only.
 */
export interface TransmissionTorrent_Mutable {
  "bandwidthPriority": number
  "downloadLimit": number
  "downloadLimited": boolean
  "honorsSessionLimits": boolean
  "peer-limit": number
  "queuePosition": number
  "seedIdleLimit": number
  "seedIdleMode": number
  "seedRatioLimit": number
  "seedRatioMode": number
  "uploadLimit": number
  "uploadLimited": boolean
}

export interface TransmissionTorrent
       extends TransmissionTorrent_Mutable, TransmissionTorrent_WriteOnly {
  "activityDate": number
  "addedDate": number
  "comment": string
  "corruptEver": number
  "creator": string
  "dateCreated": number
  "desiredAvailable": number
  "doneDate": number
  "downloadDir": string
  "downloadedEver": number
  "error": number
  "errorString": string
  "eta": number
  "etaIdle": number
  "files": TransmissionTorrentFiles[]
  "fileStats": TransmissionTorrentFileStats[]
  "hashString": string
  "haveUnchecked": number
  "haveValid": number
  "id": number
  "isFinished": boolean
  "isPrivate": boolean
  "isStalled": boolean
  "leftUntilDone": number
  "magnetLink": string
  "manualAnnounceTime": number
  "maxConnectedPeers": number
  "metadataPercentComplete": number
  "name": string
  "peers": TransmissionTorrentPeers[]
  "peersFrom": TransmissionTorrentPeersFrom
  "peersConnected": number
  "peersGettingFromUs": number
  "peersSendingToUs": number
  "percentDone": number
  "pieces": TransmissionTorrentPieces
  "pieceCount": number
  "pieceSize": number
  "priorities": TransmissionPriorityType[]
  "rateDownload": number
  "rateUpload": number
  "recheckProgress": number
  "secondsDownloading": number
  "secondsSeeding": number
  "sizeWhenDone": number
  "startDate": number
  "status": TransmissionTorrentStatus
  "totalSize": number
  "torrentFile": string
  "trackers": TransmissionTorrentTrackers[]
  "trackerStats": TransmissionTorrentTrackerStats[]
  "uploadedEver": number
  "uploadRatio": number
  "wanted": (0 | 1)[] // actually a number, 0 or 1.
  "webseedsSendingToUs": number
  "webseeds": string[]
}
