import { RootThunk } from '../state';
import { torrentSelected } from './actions';
import { selectFilteredTorrents, selectSelectedTorrentIds } from '../selectors';

export const allTorrentsSelected: RootThunk =
  (dispatch, getState) => {
    const ids = selectFilteredTorrents(getState())
    dispatch(torrentSelected({ ids }))
  }

/**
 * Select torrents in a range, using {@code anchor} to determine
 * where the selection should stop. The behaviour here is similair
 * to shift clicking a range of files in a conventional file manager.
 *
 * The selection algorithm has the following rules.
 *   - With only one existing selection all torrents in the range
 *     including the anchor and the selection will be selected.
 *     NOTE if there's no selection, an invisible selection will
 *     be placed on the first torrent.
 *       --------------------------------
 *       |          |        |          |
 *       | Selected |        | Selected |
 *       |          |  ===>  | Selected |
 *       | Anchor   |        | Selected |
 *       |          |        |          |
 *       --------------------------------
 *
 *  - When multiple selections already exist and the anchor lies
 *    outside of the range between the highest selection and lowest
 *    selection, all torrents in the range between the existing
 *    selection and the anchor will be selected.
 *       --------------------------------
 *       |          |        |          |
 *       | Selected |        | Selected |
 *       |          |        | Selected |
 *       | Selected |  ===>  | Selected |
 *       |          |        | Selected |
 *       | Anchor   |        | Selected |
 *       |          |        |          |
 *       --------------------------------
 *
 *       --------------------------------
 *       |          |        |          |
 *       | Anchor   |        | Selected |
 *       |          |        | Selected |
 *       |          |  ===>  | Selected |
 *       | Selected |        | Selected |
 *       | Selected |        | Selected |
 *       |          |        |          |
 *       --------------------------------
 *
 *  - When multiple selections exist and the anchor lies between
 *    the range of the highest and lowest selection. All files in
 *    the range between the highest and lowest selection will be
 *    selected.
 *
 *       --------------------------------
 *       |          |        |          |
 *       | Selected |        | Selected |
 *       |          |        | Selected |
 *       | Anchor   |  ===>  | Selected |
 *       |          |        | Selected |
 *       | Selected |        | Selected |
 *       |          |        |          |
 *       --------------------------------
 *
 */
export const torrentRangeSelected =
  (anchor: number): RootThunk => {
    return (dispatch, getState) => {
      const state = getState()
      const ids = selectFilteredTorrents(state)
      let selected = selectSelectedTorrentIds(state)

      // when no selection exists, select from first torrent.
      if (selected.length === 0)
        selected = [ids[0]]

      const anchorIndex = ids.indexOf(anchor)

      if (anchorIndex === -1) {
        console.warn('unable to find anchor', anchor, 'for shift-click in', ids)
        return
      }

      const selectedByOrder = selected.slice()
        .sort((a, b) => ids.indexOf(a) - ids.indexOf(b))
      const minIndex = ids.indexOf(selectedByOrder[0])
      const maxIndex = ids.indexOf(selectedByOrder[selectedByOrder.length-1])

      let [min, max] = [minIndex, maxIndex]
      if (anchorIndex > maxIndex) {
        max = anchorIndex
      } else if (anchorIndex < minIndex) {
        min = anchorIndex;
      }

      dispatch(torrentSelected({ ids: ids.slice(min, max+1) }))
    }
  }
