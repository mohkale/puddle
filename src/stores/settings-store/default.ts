import { TorrentFields } from '@puddle/models';
import {
  SettingsState, COLUMN_DEFAULT_WIDTH as DEFAULT_WIDTH,
  COLUMN_MINIMUM_WIDTH as MINIMUM_WIDTH,
} from './state';

const defaultState: SettingsState = {
  columns: {
    entries: {
      [TorrentFields.QUEUE_POSITION]: {
        title: '#',
        tooltip: 'Queue Position',
        width: Math.max(MINIMUM_WIDTH, 40),
      },
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
      [TorrentFields.TAGS]: {
        title: "Tags",
        width: DEFAULT_WIDTH,
      },
      [TorrentFields.COMPLETED_DATE]: {
        title: "Completed",
        tooltip: "Date Completed",
        width: DEFAULT_WIDTH,
      },
    },
    order: [
      TorrentFields.QUEUE_POSITION,
      TorrentFields.NAME,
      TorrentFields.PROGRESS,
      TorrentFields.DOWNLOADED,
      TorrentFields.DOWNLOAD_SPEED,
      TorrentFields.UPLOADED,
      TorrentFields.UPLOAD_SPEED,
      TorrentFields.ETA,
      TorrentFields.RATIO,
      TorrentFields.FILE_SIZE,
      TorrentFields.TAGS,
      TorrentFields.COMPLETED_DATE,
      TorrentFields.ADDED,
    ]
  },

  intervals: {
    torrentsSync: 2000,
    speedSync: 1000,
    speedLimitsSync: 60000,
  }
}

export default defaultState;
