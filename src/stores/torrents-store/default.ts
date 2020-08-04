import { TorrentState } from './state';
import { TorrentFields, TorrentClasses } from '@puddle/models';

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
}

export default defaultState;
