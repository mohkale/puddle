import FlexSearch from 'flexsearch';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../state';
import { TorrentClasses } from '../classes';

/**
 * Construct and return a predicate which given some torrent id
 * will return whether the class of the associated torrent matches
 * the active torrent class in puddles filter.
 */
const selectTorrentsMatchingClassPredicate =
  createSelector(
    [(state: RootState) => state.torrents.byClass,
     (state: RootState) => state.torrents.filters.classes],
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
 * Construct and return a predicate which, given some torrent id
 * returns whether the associated torrent has a tracker in the
 * active trackers filter. If the filter is empty then every torrent
 * passes the filter.
 */
const selectTorrentsMatchingTrackersPredicate =
  createSelector(
    [(state: RootState) => state.torrents.byTracker,
     (state: RootState) => state.torrents.filters.trackers],
    (byTracker, activeTrackers) => {
      if (activeTrackers.length === 0) {
        return () => true
      }

      const activeTrackerIds = activeTrackers.reduce((acc, tracker) => {
        (byTracker[tracker] || []).forEach(v => acc.add(v))
        return acc
      }, new Set())

      return (id: number) => activeTrackerIds.has(id);
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
     (state: RootState) => state.torrents.filters.query],
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
   selectTorrentsMatchingTrackersPredicate,
   selectTorrentsMatchingQueryPredicate],
  (ids, classPredicate, trackersPredicate, queryPredicate) => {
    return ids.filter(
      id => classPredicate(id) &&
            trackersPredicate(id) &&
            queryPredicate(id))
   }
)
