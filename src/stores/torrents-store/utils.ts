import { TorrentState } from './state';
import { torrentComparators } from '../fields';
import { arrayRemove } from '@puddle/utils';

function pushToCollection<T>(collection: { [key: string]: T[] }, key: string, val: T) {
  if (collection[key] === undefined) {
    collection[key] = [val]
  } else {
    collection[key].push(val)
  }
}

function removeFromCollection<T>(collection: { [key: string]: T[] }, key: string, val: T) {
  const entries = collection[key]
  if (entries.length === 1) {
    delete collection[key]
  } else {
    arrayRemove(entries, val, () => {
      // NOTE this should never happen, but you should account for it anyways.
      console.warn(`removing torrent ${val} but associated entry doesn't contain it ${key}.`)
    })
  }
}

export function addTorrentToTracker(state: TorrentState, tracker: string, id: number) {
  pushToCollection(state.byTracker, tracker, id)
}

export function removeTorrentFromTracker(state: TorrentState, tracker: string, id: number) {
  removeFromCollection(state.byTracker, tracker, id)
}

export function addTorrentToLabel(state: TorrentState, label: string, id: number) {
  pushToCollection(state.byLabels, label, id)
}

export function removeTorrentFromLabel(state: TorrentState, label: string, id: number) {
  removeFromCollection(state.byLabels, label, id)
}

export function sortByColumn(state: TorrentState, torrents: number[]) {
  torrents.sort((idA, idB) => {
    const res = torrentComparators[state.activeField](
      state.entries[idA],
      state.entries[idB],
    )
    return (!state.showDescending) ? -res : res
  })
}

