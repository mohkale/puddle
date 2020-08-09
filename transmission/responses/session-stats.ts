export interface TransmissionSessionFineGrainedStats {
  uploadedBytes: number
  downloadedBytes: number
  filesAdded: number
  sessionCount: number
  secondsActive: number
}

export interface TransmissionSessionStats {
  "activeTorrentCount": number
  "pausedTorrentCount": number
  "torrentCount": number
  "downloadSpeed": number
  "uploadSpeed": number
  "cumulative-stats": TransmissionSessionFineGrainedStats
  "current-stats": TransmissionSessionFineGrainedStats
}
