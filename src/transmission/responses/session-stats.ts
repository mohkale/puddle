export interface TransmissionSessionFineGrainedStatsType {
  uploadedBytes: number
  downloadedBytes: number
  filesAdded: number
  sessionCount: number
  secondsActive: number
}

export default class TransmissionSessionStatsType {
  "activeTorrentCount": number
  "pausedTorrentCount": number
  "torrentCount": number
  "downloadSpeed": number
  "uploadSpeed": number
  "cumulative-stats": SessionFineGrainStats
  "current-stats": SessionFineGrainStats
}
