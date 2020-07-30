import { UIState } from './state';
import { TorrentClasses } from '../classes';

const defaultState: UIState = {
  selected: [],

  filters: {
    query: '',
    classes: TorrentClasses.ALL,
    trackers: [],
    labels: [],
  }
}

export default defaultState;
