import { ColumnType } from '../columns';
import { TorrentId } from '@puddle/transmission';
import TorrentResponse, {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission/responses/torrent';

// WARN typescript doesn't have a way to declare the types of
// an interface at compile time and then reference those same
// types at runtime. We're going to have to copy the two here
// and manually keep them in sync.

export const TORRENT_FIELDS: (keyof TorrentResponse)[] = [
  "id",
  "name",
  "status",
  "sizeWhenDone",
  "haveValid",
  "haveUnchecked",
  "downloadedEver",
  "rateDownload",
  "uploadedEver",
  "rateUpload",
  "eta",
  "status",
  "uploadRatio",
  "sizeWhenDone",
  "addedDate",
]

export type Torrent = Pick<TorrentResponse,
  "id" | "name" | "status" | "sizeWhenDone" | "haveValid" |
  "haveUnchecked" | "downloadedEver" | "rateDownload" | "uploadedEver" |
  "rateUpload" | "eta" | "status" | "uploadRatio" | "sizeWhenDone" |
  "addedDate">

