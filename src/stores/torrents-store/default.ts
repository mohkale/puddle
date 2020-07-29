import { TorrentState } from './state';
import { TorrentFields } from '../fields';
import { TorrentClasses } from '../classes';

const defaultState: TorrentState = {
  ids: [],
  entries: {},

  activeField: TorrentFields.NAME,
  showDescending: false,
  ordered: [],

  toName: {},
  byTracker: {},
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
    trackers: []
  }
}

export default defaultState;
