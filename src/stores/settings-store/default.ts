import { TorrentFields } from '../fields';
import { SettingsState, COLUMN_DEFAULT_WIDTH as DEFAULT_WIDTH } from './state';

const defaultState: SettingsState = {
  columns: {
    entries: {
      [TorrentFields.NAME]: {
        title: "Name",
        width: 244,
      },
      [TorrentFields.PROGRESS]: {
        title: "Progress",
        width: 164,
      },
      [TorrentFields.DOWNLOADED]: {
        title: "Downloaded",
        width: DEFAULT_WIDTH,
      },
      [TorrentFields.DOWNLOAD_SPEED]: {
        title: "Download Speed",
        width: DEFAULT_WIDTH,
      },
      [TorrentFields.UPLOADED]: {
        title: "Uploaded",
        width: DEFAULT_WIDTH,
      },
      [TorrentFields.UPLOAD_SPEED]: {
        title: "Upload Speed",
        width: DEFAULT_WIDTH,
      },
      [TorrentFields.ETA]: {
        title: "ETA",
        width: DEFAULT_WIDTH,
      },
      [TorrentFields.RATIO]: {
        title: "Ratio",
        width: DEFAULT_WIDTH,
      },
      [TorrentFields.FILE_SIZE]: {
        title: "File Size",
        width: DEFAULT_WIDTH,
      },
      [TorrentFields.ADDED]: {
        title: "Added",
        width: DEFAULT_WIDTH,
      },
    },
    order: [
      TorrentFields.NAME,
      TorrentFields.PROGRESS,
      TorrentFields.DOWNLOADED,
      TorrentFields.DOWNLOAD_SPEED,
      TorrentFields.UPLOADED,
      TorrentFields.UPLOAD_SPEED,
      TorrentFields.ETA,
      TorrentFields.RATIO,
      TorrentFields.FILE_SIZE,
      TorrentFields.ADDED
    ]
  },
}

export default defaultState;
