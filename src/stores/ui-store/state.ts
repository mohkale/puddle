import { TorrentClasses } from '../classes';

export interface UIState {
  /** subset of torrents that have been selected. */
  selected: number[]

  /**
   * Field that are used to filter down the displayed list of
   * torrents.
   */
  filters: {
    query: string
    classes: TorrentClasses
    trackers: string[]
    labels: string[]
  }
}
