import Transmission from '@transmission/client';

import store, {
  syncStats, syncSession,
  updateRecentlyActiveTorrents as updateTorrents
} from '@client/stores';
import { Updater } from '@client/utils';

export default function updater(
  t: Transmission, torrentSyncInterval: number,
  speedSyncInterval: number, speedLimitsSyncInterval: number
) {
  // NOTE we could probably reuse the same instances after stopping them
  // and changing the intervals. starting again. There is the worry about
  // concurrency, at the very least we'll probably need to re-instantiate
  // interval().
  const updaters = [
    new Updater(() => store.dispatch(updateTorrents(t)), torrentSyncInterval),
    new Updater(() => store.dispatch(syncStats(t)), speedSyncInterval),
    new Updater(() => store.dispatch(syncSession(t)), speedLimitsSyncInterval),
  ]

  updaters.forEach(u => u.start())

  return () => {
    updaters.forEach(u => u.stop())

    // after clearing, invoke updateTorrents anyways, just in
    // case we missed the duration in which changes are
    // transmitted.
    store.dispatch(updateTorrents(t))
  }
}
