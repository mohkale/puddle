import { torrentClass, TorrentClasses } from './classes';
import {
  TorrentId, TransmissionTorrent as TorrentResponse
} from '@puddle/transmission';

// WARN typescript doesn't have a way to declare the types of
// an interface at compile time and then reference those same
// types at runtime. We're going to have to copy the two here
// and manually keep them in sync.

export const TORRENT_FIELDS: (keyof TorrentResponse)[] = [
  "id",
  "name",
  "status",
  "percentDone",
  "downloadedEver",
  "rateDownload",
  "uploadedEver",
  "rateUpload",
  "eta",
  "uploadRatio",
  "sizeWhenDone",
  "addedDate",
  "error",
  "trackers",
  "queuePosition",
  "labels",
]

/**
 * The fields we inherit from the default API response.
 */
type TorrentDefaultFields =
  Pick<TorrentResponse, "name" | "status" | "percentDone" |
       "downloadedEver" | "rateDownload" | "uploadedEver" | "rateUpload" |
       "eta" | "uploadRatio" | "sizeWhenDone" | "addedDate" | "error" |
       "trackers" | "queuePosition" | "labels">

/**
 * The model for a single torrent.
 *
 * This extends the fields from a torrent response (see
 * {@code TorrentDefaultFields}) with some extra useful
 * parameters.
 */
export interface Torrent extends TorrentDefaultFields {
  id: number
  selected: boolean
  classes: number
}

/**
 * A base type to supply defaults for the fields in {@code Torrent}
 * that aren't in {@code TorrentDefaultFields}.
 */
const TORRENT_BASE: Partial<Torrent> = {
  selected: false,
  classes: TorrentClasses.ALL,
}

/**
 * Convert an API response that's guaranteed to have the fields in
 * {@code TORRENT_FIELDS} to a Torrent instance.
 */
export function fromResponse(resp: Partial<TorrentResponse>, prev?: Torrent) {
  const base = prev ? prev! : TORRENT_BASE
  const torrent = Object.assign({}, base, resp) as Torrent
  torrent.classes = torrentClass(torrent)

  return torrent
}
