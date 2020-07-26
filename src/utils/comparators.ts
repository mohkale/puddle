import { Torrent } from '@puddle/stores/torrent';
import { ColumnType } from '@puddle/stores/columns-store';

type Comparers = (a: Torrent, b: Torrent) => number

const torrentComparators: { [key in ColumnType]: Comparers } = {
  [ColumnType.NAME]: (a, b) => a.name.localeCompare(b.name),
  [ColumnType.PROGRESS]: (a, b) => a.percentDone - b.percentDone,
  [ColumnType.DOWNLOADED]: (a, b) => a.downloadedEver - b.downloadedEver,
  [ColumnType.DOWNLOAD_SPEED]: (a, b) => a.rateDownload - b.rateDownload,
  [ColumnType.UPLOADED]: (a, b) => a.uploadedEver - b.uploadedEver,
  [ColumnType.UPLOAD_SPEED]: (a, b) => a.rateUpload - b.rateUpload,
  [ColumnType.ETA]: (a, b) => a.eta - b.eta, // TODO re-evaluate
  [ColumnType.RATIO]: (a, b) => a.uploadRatio - b.uploadRatio,
  [ColumnType.FILE_SIZE]: (a, b) => a.sizeWhenDone - b.sizeWhenDone,
  [ColumnType.ADDED]: (a, b) => a.addedDate - b.addedDate,
}

export default torrentComparators
