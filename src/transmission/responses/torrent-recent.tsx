import { TransmissionTorrent } from './torrent';

// DAMN, that's a real mouthful.
export interface TransmissionRecentlyActiveTorrents {
  /**
   * list of torrents for which something has changed.
   */
  torrents: Partial<TransmissionTorrent>[]

  /**
   * ids of torrents which have been removed from transmission.
   */
  removed: number[]
}
