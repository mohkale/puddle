import { TorrentState } from './state';
import { torrentComparators } from '../fields';
import { arrayRemove } from '@puddle/utils';

export function addTorrentToTracker(state: TorrentState, tracker: string, id: number) {
  if (state.byTracker[tracker] === undefined) {
    state.byTracker[tracker] = [id]
  } else {
    state.byTracker[tracker].push(id)
  }
}

export function removeTorrentFromTracker(state: TorrentState, tracker: string, id: number) {
  const trackerTorrents = state.byTracker[tracker]
  if (trackerTorrents.length === 1) {
    delete state.byTracker[tracker]
  } else {
    arrayRemove(state.byTracker[tracker], id, () => {
      // NOTE this should never happen, but you should account for it anyways.
      console.warn(`removing torrent ${id} but associated tracker doesn't contain it ${tracker}.`)
    })
  }
}

export function sortByColumn(state: TorrentState, torrents: number[]) {
  torrents.sort((idA, idB) => {
    let res = torrentComparators[state.activeField](
      state.entries[idA],
      state.entries[idB],
    )
    return (!state.showDescending) ? -res : res
  })
}

