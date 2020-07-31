import Transmission from '@puddle/transmission';

import store, {
  updateTorrents, syncStats, syncStatsLimits,
} from '@puddle/stores';

const TORRENT_SYNC_INTERVAL = 2000;
const STATS_SYNC_SPEED_INTERVAL = 1000;
const STATS_SYNC_LIMIT_INTERVAL = 60000;

export default function updater(t: Transmission) {
  let updateTorrentsTimeout, syncStatsTimeout, syncStatsLimitTimeout;
  const fetchTorrents = () =>
    updateTorrentsTimeout = setTimeout(() => {
      store.dispatch(updateTorrents(t))
        .then(fetchTorrents)
    }, TORRENT_SYNC_INTERVAL)

  const updateStats = () =>
    syncStatsTimeout = setTimeout(() => {
      store.dispatch(syncStats(t))
        .then(updateStats)
    }, STATS_SYNC_SPEED_INTERVAL)

  const updateStatsLimits = () =>
    syncStatsLimitTimeout = setTimeout(() => {
      store.dispatch(syncStatsLimits(t))
        .then(updateStatsLimits)
    }, STATS_SYNC_LIMIT_INTERVAL)

  fetchTorrents();
  updateStats();
  updateStatsLimits();

  return () => {
    updateTorrentsTimeout && clearTimeout(updateTorrentsTimeout)
    syncStatsTimeout && clearTimeout(syncStatsTimeout)
    syncStatsLimitTimeout && clearTimeout(syncStatsLimitTimeout)
  }
}
