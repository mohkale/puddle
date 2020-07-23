export interface TransmissionSessionUnitsType {
  "speed-units": string[]
  "speed-bytes": number[]
  "size-units": string[]
  "size-bytes": number[]
  "memory-units": string[]
  "memory-bytes": number[]
}

/*
 * subset of fields in {@code TransmissionSession} that can be changed
 * at runtime, used for later type assertions.
 */
export interface TransmissionSessionType_Mutable {
  "alt-speed-down": number
  "alt-speed-enabled": boolean
  "alt-speed-time-begin": number
  "alt-speed-time-enabled": boolean
  "alt-speed-time-end": number
  "alt-speed-time-day": number
  "alt-speed-up": number
  "blocklist-url": string
  "blocklist-enabled": boolean
  "cache-size-mb": number
  "download-dir": string
  "download-queue-size": number
  "download-queue-enabled": boolean
  "dht-enabled": boolean
  "encryption": string
  "idle-seeding-limit": number
  "idle-seeding-limit-enabled": boolean
  "incomplete-dir": string
  "incomplete-dir-enabled": boolean
  "lpd-enabled": boolean
  "peer-limit-global": number
  "peer-limit-per-torrent": number
  "pex-enabled": boolean
  "peer-port": number
  "peer-port-random-on-start": boolean
  "port-forwarding-enabled": boolean
  "queue-stalled-enabled": boolean
  "queue-stalled-minutes": number
  "rename-partial-files": boolean
  "script-torrent-done-filename": string
  "script-torrent-done-enabled": boolean
  "seedRatioLimit": number
  "seedRatioLimited": boolean
  "seed-queue-size": number
  "seed-queue-enabled": boolean
  "speed-limit-down": number
  "speed-limit-down-enabled": boolean
  "speed-limit-up": number
  "speed-limit-up-enabled": boolean
  "start-added-torrents": boolean
  "trash-original-torrent-files": boolean
  "utp-enabled": boolean
}

export default interface TransmissionSessionType extends TransmissionSessionType_Mutable {
  "blocklist-size": number
  "config-dir": string
  "rpc-version": number
  "rpc-version-minimum": number
  "version": string

  // not called mutable in the spec... but it has to be, right :/
  "units": TransmissionSessionUnitsType
}
