export interface NetworkStats {
  /** maximum transfer rate in bytes per second */
  rate:  number

  /** total number of bytes transferred this session */
  total: number

  /** maxmimm possible value for {@code rate} */
  limit: number

  /** maximum possible value for {@code rate} when alt speed is active. */
  altLimit: number
}

export interface StatsState {
  /** Network stats for downloading. */
  download: NetworkStats

  /** Network stats for uploading. */
  upload:   NetworkStats

  /** Whether alternative download settings are enabled. */
  altEnabled: boolean
}

