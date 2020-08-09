import { UIState } from './state';
import { ViewType } from './views';
import { TorrentClasses } from '@client/models';

const defaultState: UIState = {
  view: {
    type: ViewType.SIGN_IN
  },

  selected: [],
  overlay: undefined,

  filters: {
    query: '',
    classes: TorrentClasses.ALL,
    trackers: [],
    labels: [],
  }
}

export default defaultState;
