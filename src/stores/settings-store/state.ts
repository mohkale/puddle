import { TorrentFields } from '../fields';

export const COLUMN_DEFAULT_WIDTH = 100;
export const COLUMN_MINIMUM_WIDTH = 10;

export interface Column {
  title: string
  tooltip?: string
  width: number
}

export interface IntervalsType {
  torrentsSync: number
  speedSync: number
  speedLimitsSync: number
}

export interface SettingsState {
  /** Settings related to the columns shown on the dashboard. */
  columns: {
    /** Metadata associated with a column. */
    entries: { [key in TorrentFields]: Column }

    /**
     * The order in which columns are presented.
     *
     * Remove a torrent from this list to avoid it displaying it to
     * the user. WARN you should never remove a torrent in
     * {@code ESSENTIAL_FIELDS}.
     */
    order: TorrentFields[]
  }

  intervals: IntervalsType
}
