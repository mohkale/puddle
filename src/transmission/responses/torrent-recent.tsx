import TransmissionTorrentType from './torrent';

// DAMN, that's a real mouthful.
export default interface TransmissionRecentlyActiveTorrentType {
  /**
   * list of torrents for which something has changed.
   */
  torrents: Partial<TransmissionTorrentType>[]

  /**
   * ids of torrents which have been removed from transmission.
   */
  removed: number[]
}
