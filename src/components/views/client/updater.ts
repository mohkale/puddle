import Transmission from '@puddle/transmission';

import store, {
  updateTorrents, syncStats, syncStatsLimits,
} from '@puddle/stores';

import interval from 'interval-promise'

/**
 * Manages the propogation of some asynchronous action at
 * fixed intervals while offering a means to stop the action
 * at any point (including in between a running action).
 */
export class Updater {
  constructor(func: () => Promise<void>, interval: number) {
    this.promiser = func
    this.interval = interval
  }

  promiser: () => Promise<void>
  private interval: number
  private stopped: boolean = false

  private runner = async (i, stop) => {
    if (this.stopped) {
      stop()
    } else {
      await this.promiser()
    }
  }

  start() {
    this.stopped = false
    interval(this.runner, this.interval)
  }

  stop() {
    this.stopped = true
  }
}

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
    new Updater(() => store.dispatch(syncStatsLimits(t)), speedLimitsSyncInterval),
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
