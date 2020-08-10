export * from './responses';

/**
 * a single torrent id, according to the transmission spec this
 * can be a numerical id or the sha1 hash for the associated torrent.
 */
export type TorrentId = number | string

/**
 * A reference to potentially many torrents, the transmission spec also
 * states that if this isn't provided (is undefined) then all torrents
 * will be affected.
*/
export type TorrentIds = TorrentId | TorrentId[] | undefined | null

/**
 * The required parameters needed to add a new torrent instance.
*/
export type TransmissionTorrentAddSource = { filename: string } | { metainfo: string }
