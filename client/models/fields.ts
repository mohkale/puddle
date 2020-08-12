/**
 * A field is some attribute calculated from a torrent instance
 * that represents a relevent piece of information about the torrent.
 * Theses fields will be presented to the user as columns on the
 * dashboard.
 */

import { Torrent } from './torrent';

/**
 * The complete set of fields the user can be shown on the dashboard.
 * A subset of these will commonly be presented and the user retains.
 */
export enum TorrentFields {
  QUEUE_POSITION,
  NAME,
  PROGRESS,
  DOWNLOADED,
  DOWNLOAD_SPEED,
  UPLOADED,
  UPLOAD_SPEED,
  ETA,
  RATIO,
  FILE_SIZE,
  ADDED,
  TAGS,
  COMPLETED_DATE,
}

/**
 * The fields that can NEVER be disabled.
 *
 * If you could remove every field from the dashboard, then
 * what is the dashboard even showing?
 */
export const ESSENTIAL_FIELDS = [TorrentFields.NAME] // eslint-disable-line @typescript-eslint/no-unused-vars

type Comparers = (a: Torrent, b: Torrent) => number

/**
 * Used for sorting torrents on the dashboard.
 *
 * Each of these should be a function that compares two torrent instances
 * and returns either +ve, -ve or 0 to indicate precedence based on the
 * given field. For more information see [[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort][Array.prototype.sort]].
 */
export const torrentComparators: { [key in TorrentFields]: Comparers } = {
  // simple field by field comparisons across different torrents.
  [TorrentFields.QUEUE_POSITION]: (a, b) => b.queuePosition - a.queuePosition,
  [TorrentFields.NAME]:           (a, b) => b.name.localeCompare(a.name),
  [TorrentFields.PROGRESS]:       (a, b) => a.percentDone    - b.percentDone,
  [TorrentFields.DOWNLOADED]:     (a, b) => a.downloadedEver - b.downloadedEver,
  [TorrentFields.DOWNLOAD_SPEED]: (a, b) => a.rateDownload   - b.rateDownload,
  [TorrentFields.UPLOADED]:       (a, b) => a.uploadedEver   - b.uploadedEver,
  [TorrentFields.UPLOAD_SPEED]:   (a, b) => a.rateUpload     - b.rateUpload,
  [TorrentFields.RATIO]:          (a, b) => a.uploadRatio    - b.uploadRatio,
  [TorrentFields.FILE_SIZE]:      (a, b) => a.sizeWhenDone   - b.sizeWhenDone,
  [TorrentFields.ADDED]:          (a, b) => a.addedDate      - b.addedDate,

  // TODO always sort incomplete torrents at the bottom, regardless of
  // ascending or descending.
  [TorrentFields.COMPLETED_DATE]: (a, b) => a.doneDate       - b.doneDate,

  // TODO maybe we can come up with a better comparison metric here.
  [TorrentFields.TAGS]: (a, b) => a.labels.length  - b.labels.length,

  [TorrentFields.ETA]: (a, b) => {
    if (a.eta === b.eta) {
      return 0
    } else if (a.eta < 0) {
      return -1
    } else if (b.eta < 0) {
      return +1
    } else {
      return a.eta - b.eta
    }
  },
}
