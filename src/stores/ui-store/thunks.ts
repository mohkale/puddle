import { RootThunk } from '../state';
import { torrentSelected } from './actions';
import { selectFilteredTorrents } from '../selectors';

export const allTorrentsSelected: RootThunk =
  (dispatch, getState) => {
    const ids = selectFilteredTorrents(getState())
    dispatch(torrentSelected({ ids }))
  }
