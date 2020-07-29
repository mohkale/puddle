/**
 * Here we distinguish between the torrent states offered by transmission
 * and the torrent *classes* offered by puddle. The classes here are used by
 * puddle to filter torrents, the states in {@code TransmissionTorrentStates}
 * just indicate what a given torrent is doing at some point in time.
 *
 */

import { Torrent } from '@puddle/stores';
import {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission';

import { Predicate } from '@puddle/utils/types';

export enum TorrentClasses {
  ALL         = 0b0000001,
  DOWNLOADING = 0b0000010,
  COMPLETE    = 0b0000100,
  STOPPED     = 0b0001000,
  ACTIVE      = 0b0010000,
  INACTIVE    = 0b0100000,
  ERROR       = 0b1000000,
}

// can't enumerate enums, so store copy of flag values here :sad:.
export const TorrentClassFlags =
  Object.values(TorrentClasses)
    .filter(i => !isNaN(i as number)) as Array<TorrentClasses>

// Mappings from known torrent states to checkers.
const classMatchers: { [key in TorrentClasses]: Predicate<Torrent> } = {
  [TorrentClasses.ALL]: () => true,
  [TorrentClasses.DOWNLOADING]: (torrent) => {
    // NOTE we may be able to optimize this sort of status check
    // by converting transmission torrent states to flags.
    return [TorrentStatus.DOWNLOAD_WAIT,
            TorrentStatus.DOWNLOAD].includes(torrent.status)
  },
  [TorrentClasses.COMPLETE]: (torrent) => torrent.percentDone === 1,
  [TorrentClasses.STOPPED]: (torrent) =>
    TorrentStatus.STOPPED === torrent.status,
  [TorrentClasses.ACTIVE]: (torrent) => {
    return [TorrentStatus.CHECK,
            TorrentStatus.DOWNLOAD,
            TorrentStatus.SEED].includes(torrent.status)
  },
  [TorrentClasses.INACTIVE]: (torrent) => {
    return [TorrentStatus.STOPPED,
            TorrentStatus.CHECK_WAIT,
            TorrentStatus.DOWNLOAD_WAIT,
            TorrentStatus.SEED_WAIT].includes(torrent.status)
  },
  [TorrentClasses.ERROR]: (torrent) => torrent.error !== 0
}

/**
 * Given a torrent, return a number indicating the subset
 * of supported torrent classes the torrent has.
 */
export function torrentClass(torrent: Torrent): number {
  return TorrentClassFlags.reduce((acc, flag) => {
    if (classMatchers[flag](torrent)) {
      acc |= flag
    }

    return acc
  }, 0);
}
