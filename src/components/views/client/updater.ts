import Transmission from '@puddle/transmission';

import store, {
  updateTorrents, syncStats, syncStatsLimits,
} from '@puddle/stores';

// TODO this can be refactored. Group each of theses into
// objects with an associated timeout and a reference to
// itself in a closure.

export default function updater(
  t: Transmission, torrentSyncInterval: number,
  speedSyncInterval: number, speedLimitsSyncInterval: number
) {
  let updateTorrentsTimeout, syncStatsTimeout, syncStatsLimitTimeout;
  const fetchTorrents = () =>
    updateTorrentsTimeout = setTimeout(() => {
      store.dispatch(updateTorrents(t))
        .then(fetchTorrents)
    }, torrentSyncInterval)

  const updateStats = () =>
    syncStatsTimeout = setTimeout(() => {
      store.dispatch(syncStats(t))
        .then(updateStats)
    }, speedSyncInterval)

  const updateStatsLimits = () =>
    syncStatsLimitTimeout = setTimeout(() => {
      store.dispatch(syncStatsLimits(t))
        .then(updateStatsLimits)
    }, speedLimitsSyncInterval)

  fetchTorrents();
  updateStats();
  updateStatsLimits();

  return () => {
    updateTorrentsTimeout && clearTimeout(updateTorrentsTimeout)
    syncStatsTimeout && clearTimeout(syncStatsTimeout)
    syncStatsLimitTimeout && clearTimeout(syncStatsLimitTimeout)

    // after clearing, invoke updateTorrents anyways, just in
    // case we missed the duration in which changes are
    // transmitted.
    store.dispatch(updateTorrents(t))
  }
}
