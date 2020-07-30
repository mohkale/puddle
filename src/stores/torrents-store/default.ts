import { TorrentState } from './state';
import { TorrentFields } from '../fields';
import { TorrentClasses } from '../classes';

const defaultState: TorrentState = {
  ids: [],
  entries: {},

  activeField: TorrentFields.QUEUE_POSITION,
  showDescending: false,
  ordered: [],

  toName: {},
  byTracker: {},
  byLabels: {},
  byClass: {
    [TorrentClasses.ALL]: [],
    [TorrentClasses.DOWNLOADING]: [],
    [TorrentClasses.COMPLETE]: [],
    [TorrentClasses.STOPPED]: [],
    [TorrentClasses.ACTIVE]: [],
    [TorrentClasses.INACTIVE]: [],
    [TorrentClasses.ERROR]: [],
  },

  filters: {
    query: '',
    classes: TorrentClasses.ALL,
    trackers: [],
    labels: [],
  }
}

export default defaultState;
