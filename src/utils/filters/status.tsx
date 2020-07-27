/**
 * Here we distinguish between the torrent states offered by transmission
 * and the torrent states offered by puddle. The states here are used by
 * puddle to filter torrents, the states in {@code TransmissionTorrentStates}
 * just indicate what a given torrent is doing at some point in time.
 *
 */
import { Torrent } from '@puddle/stores/torrent';
import {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission/responses/torrent';

export enum PuddleTorrentStates {
  // WARN for some reason you don't get pattern
  // matching support here. See [[https://github.com/microsoft/TypeScript/issues/39753][#39753]].
  ALL         = 1 << 0,
  DOWNLOADING = 1 << 2,
  COMPLETE    = 1 << 3,
  STOPPED     = 1 << 4,
  ACTIVE      = 1 << 5,
  INACTIVE    = 1 << 6,
  ERROR       = 1 << 7
}

// can't enumerate enums, so store copy of flag values here :sad:.
export const PuddleTorrentStateFlags =
  Object.values(PuddleTorrentStates)
    .filter(i => !isNaN(i as number)) as Array<PuddleTorrentStates>

/**
 * Assert whether a torrent is in a given state.
 */
type StateChecker = (torrent: Torrent) => boolean

/**
 * Mappings from known torrent states to checkers.
 */
const statusMatchers: { [key in PuddleTorrentStates]: StateChecker } = {
  [PuddleTorrentStates.ALL]: () => true,
  [PuddleTorrentStates.DOWNLOADING]: (torrent) => {
    // NOTE we may be able to optimize this sort of status check
    // by converting transmission torrent states to flags.
    return [TorrentStatus.DOWNLOAD_WAIT,
            TorrentStatus.DOWNLOAD].includes(torrent.status)
  },
  [PuddleTorrentStates.COMPLETE]: (torrent) => torrent.percentDone === 1,
  [PuddleTorrentStates.STOPPED]: (torrent) =>
    TorrentStatus.STOPPED === torrent.status,
  [PuddleTorrentStates.ACTIVE]: (torrent) => {
    return [TorrentStatus.CHECK,
            TorrentStatus.DOWNLOAD,
            TorrentStatus.SEED].includes(torrent.status)
  },
  [PuddleTorrentStates.INACTIVE]: (torrent) => {
    return [TorrentStatus.STOPPED,
            TorrentStatus.CHECK_WAIT,
            TorrentStatus.DOWNLOAD_WAIT,
            TorrentStatus.SEED_WAIT].includes(torrent.status)
  },
  [PuddleTorrentStates.ERROR]: (torrent) => torrent.error !== 0
}

export function torrentState(torrent: Torrent): number {
  return PuddleTorrentStateFlags.reduce((acc, flag) => {
    if (statusMatchers[flag](torrent)) {
      acc |= flag
    }

    return acc
  }, 0);
}
