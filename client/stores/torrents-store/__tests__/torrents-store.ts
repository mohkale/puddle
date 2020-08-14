import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import { generateTorrent } from '@tests/utils';
import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

import { TorrentClasses } from '@client/models';

import reducer from '../index';
import * as thunks from '../thunks';
import * as actions from '../actions';
import defaultState from '../default';

// import notificationsDefaultState from '../../notifications-store/default'
import * as notificationActions from '../../notifications-store/actions';

import {
  _handleTorrentsRemoved as torrentRemoved,
  _handleTorrentUpdated  as torrentUpdated
} from '../thunks'

const mockStore = configureStore([thunk])

const classesToClass = (klasses: TorrentClasses[]) =>
  klasses.reduce((acc, i) => acc | i, 1)

describe('settings', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('can distinguish between adding a torrent and updating', async () => {
    const store = mockStore({ torrents: {...defaultState} })
    const torrents = Array(3)
      .fill(0)
      .map(() => generateTorrent({}))

    await store.dispatch(torrentUpdated(torrents))
    expect(store.getActions()[0])
      .toEqual(actions.torrentsAdded({ torrents }))
  })

  it('can distinguish between updating a torrrent and adding', async () => {
    const torrents = Array(3)
      .fill(0)
      .map(() => generateTorrent({}))
    const store = mockStore({
      torrents: {
        ...defaultState, ids: torrents.map(t => t.id)
      }
    })

    await store.dispatch(torrentUpdated(torrents))
    expect(store.getActions()[0])
      .toEqual(actions.torrentsUpdated({ torrents }))
  })

  it('adds new torrents to the appropriate trackers filters', () => {
    const torrent = generateTorrent({
      trackers: [
        {id: 0, tier: 0, announce: 'tracker-announce-0', scrape: 'tracker-scrape'},
        {id: 1, tier: 1, announce: 'tracker-announce-1', scrape: 'tracker-scrape'},
      ]
    })

    const nextState = reducer(defaultState, actions.torrentsAdded({ torrents: [torrent] }))
    torrent.trackers.forEach(tracker => {
      expect(nextState.byTracker[tracker.announce]).toContain(torrent.id)
    })
  })

  it('adds new torrents to the appropriate labels filters', () => {
    const torrents = [
      generateTorrent({ labels: ['foo', 'bar', 'baz'] }),
      generateTorrent({ labels: [       'bar', 'baz'] }),
      generateTorrent({ labels: [              'baz'] }),
    ]

    const nextState = reducer(defaultState, actions.torrentsAdded({ torrents }))
    torrents.
      forEach(torrent => {
        torrent.labels
          .forEach(label => {
            expect(nextState.byLabels[label]).toContain(torrent.id)
          })
      })
  })

  it('adds new torrents to the appropriate classes filters', () => {
    const torrents = [generateTorrent({}), generateTorrent({}), generateTorrent({})]

    const nextState = reducer(defaultState, actions.torrentsAdded({ torrents }))
    torrents.forEach(
      torrent => {
        Object.values(TorrentClasses)
          .filter(i => Number.isInteger(i))
          .map(i => Number(i))
          .forEach(cls => {
            const expectation = expect(nextState.byClass[cls])
            if ((torrent.classes & cls) !== 0) {
              expectation.toContain(torrent.id)
            } else {
              expectation.not.toContain(torrent.id)
            }
          })
      })
  })

  it('can handle a change in trackers', () => {
    const initialTrackers = [
      {id: 0, tier: 0, announce: 'tracker-announce-0', scrape: 'tracker-scrape'},
      {id: 1, tier: 1, announce: 'tracker-announce-1', scrape: 'tracker-scrape'},
      {id: 2, tier: 2, announce: 'tracker-announce-2', scrape: 'tracker-scrape'},
    ]
    const finalTrackers = initialTrackers.slice(2)

    const torrent = generateTorrent({trackers: initialTrackers})
    const nextTorrent = {...torrent, trackers: finalTrackers}

    const initialState = reducer(defaultState, actions.torrentsAdded({torrents: [torrent]}));
    const nextState = reducer(initialState, actions.torrentsUpdated({torrents: [nextTorrent]}));

    initialTrackers.forEach(tracker =>
      expect(initialState.byTracker[tracker.announce]).toContain(torrent.id))

    finalTrackers.forEach(tracker =>
      expect(nextState.byTracker[tracker.announce]).toContain(torrent.id))
  })

  it('can handle a change in classes', () => {
    const initialClasses = [TorrentClasses.ALL, TorrentClasses.STOPPED]
    const finalClasses = []

    const torrent = generateTorrent({ classes: classesToClass(initialClasses) })
    const nextTorrent = {...torrent, classes: classesToClass(finalClasses) }

    const initialState = reducer(defaultState, actions.torrentsAdded({torrents: [torrent]}));
    const nextState = reducer(initialState, actions.torrentsUpdated({torrents: [nextTorrent]}));

    initialClasses.forEach(cls => expect(initialState.byClass[cls]).toContain(torrent.id))
    finalClasses.forEach(cls => expect(nextState.byClass[cls]).toContain(torrent.id))
  })

  it('can handle a change in labels', () => {
    const initialLabels = ['foo', 'bar', 'baz']
    const finalLabels   = ['foo', 'bag', 'bam']
    const torrent = generateTorrent({ labels: initialLabels })
    const nextTorrent = { ...torrent, labels: finalLabels }

    const initialState = reducer(
      defaultState, actions.torrentsAdded({torrents: [torrent]}));
    const nextState = reducer(
      initialState, actions.torrentsUpdated({torrents: [nextTorrent]}));

    [...(new Set([...initialLabels, ...finalLabels]))]
      .forEach(label => {
        const inInitial = initialLabels.includes(label),
              inFinal = finalLabels.includes(label)

        if (inInitial) expect(initialState.byLabels[label]).toContain(torrent.id)
        else           expect(initialState.byLabels[label]).toBeUndefined()

        if (inFinal) expect(nextState.byLabels[label]).toContain(torrent.id)
        else         expect(nextState.byLabels[label]).toBeUndefined()
      })
  })

  it('can remove a torrent', () => {
    const torrentsToRemove = [generateTorrent({}), generateTorrent({})]
    const torrents = [generateTorrent({}), ...torrentsToRemove]

    const initialState = reducer(defaultState, actions.torrentsAdded({torrents: torrents}));
    const nextState = reducer(initialState, actions.torrentsRemoved({ ids: torrentsToRemove.map(t => t.id) }));

    torrentsToRemove
      .map(t => t.id)
      .forEach(id => expect(nextState.ids).not.toContain(id))
  })

  it('can keep removed torrents out of trackers filter', () => {
    const trackers = [
      {id: 0, tier: 0, announce: 'tracker-announce-0', scrape: 'tracker-scrape'},
      {id: 1, tier: 1, announce: 'tracker-announce-1', scrape: 'tracker-scrape'},
      {id: 2, tier: 2, announce: 'tracker-announce-2', scrape: 'tracker-scrape'},
    ]

    const torrent = generateTorrent({ trackers: trackers })
    const torrents = [
      torrent,
      generateTorrent({ trackers: trackers }),
      generateTorrent({ trackers: trackers }),
    ]

    const initialState = reducer(defaultState, actions.torrentsAdded({torrents: torrents}));
    const nextState = reducer(initialState, actions.torrentsRemoved({ ids: [torrent.id] }));

    trackers.forEach(tracker => {
      expect(initialState.byTracker[tracker.announce]).toContain(torrent.id)
      expect(nextState.byTracker[tracker.announce]).not.toContain(torrent.id)
    })
  })

  it('can keep removed torrents out of labels filter', () => {
    const torrent = generateTorrent({ labels: ['foo', 'bar', 'baz'] })
    const torrents = [
      torrent,
      generateTorrent({ labels: ['foo', 'bar', 'baz'] })
    ]

    const initialState = reducer(defaultState, actions.torrentsAdded({torrents: torrents}));
    const nextState = reducer(initialState, actions.torrentsRemoved({ ids: [torrent.id] }));

    torrent.labels.forEach(label => {
      expect(initialState.byLabels[label]).toContain(torrent.id)
      expect(nextState.byLabels[label]).not.toContain(torrent.id)
    })
  })

  it('can keep removed torrents out of classes filter', () => {
    const initialClasses = [
      TorrentClasses.ALL, TorrentClasses.DOWNLOADING, TorrentClasses.ACTIVE
    ]

    const torrent = generateTorrent({ classes: classesToClass(initialClasses) })
    const torrents = [
      torrent,
      generateTorrent({ classes: classesToClass(initialClasses) })
    ]

    const initialState = reducer(defaultState, actions.torrentsAdded({torrents: torrents}));
    const nextState = reducer(initialState, actions.torrentsRemoved({ ids: [torrent.id] }));

    initialClasses.forEach(cls => {
      expect(initialState.byClass[cls]).toContain(torrent.id)
      expect(nextState.byClass[cls]).not.toContain(torrent.id)
    })
  })
})
