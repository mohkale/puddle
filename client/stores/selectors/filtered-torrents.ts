import FlexSearch from 'flexsearch';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../state';
import { TorrentClasses } from '@client/models';

/**
 * Construct and return a predicate which given some torrent id
 * will return whether the class of the associated torrent matches
 * the active torrent class in puddles filter.
 */
const selectTorrentsMatchingClassPredicate =
  createSelector(
    [(state: RootState) => state.torrents.byClass,
     (state: RootState) => state.ui.filters.classes],
    (byClasses, activeClass) => {
      // we ignore the single source of truth principle here
      // because implicitly there's no need to have a check
      // for this... unless our store schema is broken.
      if (activeClass === TorrentClasses.ALL) {
        return () => true
      }

      const activeClassIds = new Set(byClasses[activeClass])
      return (id: number) => activeClassIds.has(id)
    }
  )

/**
 * Convert a mapping from some index type to torrent ids, into
 * a set of unique ids filtered by membership in {@code active}.
 *
 * @param collection of some arbitrary identifier to torrent ids
 * @param active, subset of keys in collection
 * @returns the flattened unique set of torrent ids retrieved by
 *          mapping each key in {@code active} through
 *          {@code collection}.
 */
function reduceMapping(collection: { [key: string]: number[] }, active: string[]) {
  return active.reduce((acc, key) => {
    const entries = collection[key]
    if (entries) {
      entries.forEach(v => acc.add(v))
    }

    return acc
  }, new Set())
}

/**
 * Construct and return a predicate which, given some torrent id
 * returns whether the associated torrent has a tracker in the
 * active trackers filter. If the filter is empty then every torrent
 * passes the filter.
 */
const selectTorrentsMatchingTrackersPredicate =
  createSelector(
    [(state: RootState) => state.torrents.byTracker,
     (state: RootState) => state.ui.filters.trackers],
    (byTracker, activeTrackers) => {
      if (activeTrackers.length === 0) {
        return () => true
      }

      const activeTrackerIds = reduceMapping(byTracker, activeTrackers)
      return (id: number) => activeTrackerIds.has(id)
    }
  )

/**
 * Like {@code selectTorrentsMatchingTrackersPredicate} but targets
 * torrent labels instead of torrent trackers.
 */
const selectTorrentsMatchingLabelsPredicate =
  createSelector(
    [(state: RootState) => state.torrents.byLabels,
     (state: RootState) => state.ui.filters.labels],
    (byLabel, activeLabels) => {
      if (activeLabels.length === 0) {
        return () => true
      }

      const activeLabelIds = reduceMapping(byLabel, activeLabels)
      return (id: number) => activeLabelIds.has(id);
    }
  )

/**
 * Construct and return a flexsearch search index for the current
 * list of torrent names. Using {@code createSelector} here means
 * that this index will only be reconstructed when a torrents name
 * changes... which is very unlikely, so for the vast majority of
 * puddles runtime, it'll be cached.
 *
 * tldr; MAJOR MEMORY AND RUNTIME BENEFITS.
 */
const selectTorrentsSearchIndex =
  createSelector(
    [(state: RootState) => state.torrents.toName],
    (toName) => {
      const index = FlexSearch.create({
        async: false,
        encode: "icase",
        tokenize: "reverse",
        threshold: 1,
        resolution: 3,
        depth: 2,
      })

      Object.entries(toName)
        .forEach(([id, name]) => index.add(Number(id), name))

      return index
    }
  )

/**
 * Construct and return a predicate which will, given some torrent id,
 * will return whether that torrents name matches the query.
 */
const selectTorrentsMatchingQueryPredicate =
  createSelector(
    [selectTorrentsSearchIndex,
     (state: RootState) => state.ui.filters.query],
    (index, query) => {
      if (query.trim() === '') {
        return () => true
      }

      // flexsearch doesn't support synchronous rendering types yet, for now
      // we'll bypass type safety but hopefully, soon, we won't need to.
      const res = index.search(query) as unknown as number[]
      const hash = new Set(res)
      return (id: number) => hash.has(id)
    }
  )

/**
 * Returns the ids of the subset of torrents in the torrent list
 * which the filters will accept IN LINEAR TIME.
 *
 * This is a heavily optomised selector for filtering through the
 * active torrents list. It works based on caching the list of
 * torrents matching each individual filter (each of which is only
 * rebuilt when their associated filter properties are modified)
 * and then simply for membership in all of the possible filter
 * predicated.
 */
export const selectFilteredTorrents = createSelector(
  [(state: RootState) => state.torrents.ordered,
   selectTorrentsMatchingClassPredicate,
   selectTorrentsMatchingLabelsPredicate,
   selectTorrentsMatchingTrackersPredicate,
   selectTorrentsMatchingQueryPredicate],
  (ids, classPredicate, labelsPredicate, trackersPredicate, queryPredicate) => {
    return ids.filter(
      id => classPredicate(id) &&
            trackersPredicate(id) &&
            labelsPredicate(id) &&
            queryPredicate(id))
   }
)
