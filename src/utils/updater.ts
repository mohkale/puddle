import interval from 'interval-promise'

let updater = 0

/**
 * Manages the propogation of some asynchronous action at
 * fixed intervals while offering a means to stop the action
 * at any point (including in between a running action).
 */
export class Updater {
  constructor(func: () => Promise<void>, interval: number) {
    this.promiser = func
    this.interval = interval
    this.updater = updater++
  }
  private updater: number

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

