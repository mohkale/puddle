import { Torrent } from '../torrent';
import { TorrentFields } from '../fields';
import { TorrentClasses } from '../classes';
import Transmission, { TorrentId } from '@puddle/transmission';

export interface TorrentState {
  /**
   * The complete list of identifiers for torrents known to transmission.
   */
  ids: number[]

  /** The field through which @{code ordered} torrents are ordered. */
  activeField: TorrentFields

  /** The order in which sorted torrents are shown. */
  showDescending: boolean

  /** Torrents ordered by the currently selected {@code activeField}. */
  ordered: number[]

  /**
   * Mappings from the list of identifiers to actual torrent
   * instances.
   */
  entries: { [key: number]: Torrent }

  /**
   * A collection of trackers and the torrents that're associated
   * with them. This is stored seprately from the {@code torrentEntries}
   * to prevent needless re-rendering whenever this is selected.
   */
  byTracker: { [key: string]: number[] }

  /**
   * A collection of torrent states and the torrents that're associated
   * with those states.
   */
  byClass: { [key in TorrentClasses]: number[] }

  /**
   * A collection of known labels alongside torrents associated with them.
   */
  byLabels: { [key: string]: number[] }

  /** Maps from torrent ids to torrent names. */
  toName: { [key: number]: string }

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
