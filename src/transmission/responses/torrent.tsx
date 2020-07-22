export interface TransmissionTorrentFilesType {
  bytesCompleted: number
  length: number
  name: string
}

export interface TransmissionTorrentFileStatsType {
  bytesCompleted: number
  wanted: boolean
  priority: number
}

export interface TransmissionTorrentPeersType {
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
  progress: double
  rateToClient: number
  rateToPerr: number
}

export interface TransmissionTorrentPeersFromType {
  fromCache: number
  fromDht: number
  fromIncoming: number
  fromLpd: number
  fromLtep: number
  fromPex: number
  fromTracker: number
}

export type TransmissionPiecesType = string

export interface TransmissionTrackersType {
  announce: string
  id: number
  scrape: string
  tier: number
}

export interface TransmissionTrackerStatsType {
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

/**
 * Fields that you can assign using the torrent-set method
 * but you can't retrieve using the torrent-get method.
 *
 * You can access the relevent information using the other
 * fields of the torrent-get method, attempting to access
 * any of these will just return 0 for them.
 */
export interface TransmissionTorrentType_WriteOnly {
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
 * in {@code TransmissionTorrentType_WriteOnly}. Any other fields are
 * read only.
 */
export interface TransmissionTorrentType_Mutable {
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

export default interface TransmissionTorrentType extends TransmissionTorrentType_Mutable {
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
  "files": TransmissionTorrentFilesType[]
  "fileStats": TransmissionTorrentFileStatsType[]
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
  "peers": TransmissionTorrentPeersType[]
  "peersFrom": TransmissionTorrentPeersFromType
  "peersConnected": number
  "peersGettingFromUs": number
  "peersSendingToUs": number
  "percentDone": number
  "pieces": TransmissionPiecesType
  "pieceCount": number
  "pieceSize": number
  "priorities": (+1 | 0 | -1)[]
  "rateDownload": number
  "rateUpload": number
  "recheckProgress": number
  "secondsDownloading": number
  "secondsSeeding": number
  "sizeWhenDone": number
  "startDate": number
  "status": number
  "totalSize": number
  "torrentFile": string
  "trackers": TransmissionTrackersType[]
  "trackerStats": TransmissionTrackerStatsType[]
  "uploadedEver": number
  "uploadRatio": number
  "wanted": (0 | 1)[]
  "webseedsSendingToUs": number
  "webseeds": string[]
}
