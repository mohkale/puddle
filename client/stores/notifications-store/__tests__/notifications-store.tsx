import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

import reducer from '../index';
import * as thunks from '../thunks';
import * as actions from '../actions';
import defaultState from '../default';
import { generateNotification } from '../utils'
import { Notification, NotificationLevel, NotificationTypes } from '../notifications';

const mockStore = configureStore([thunk])

describe('notifications', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('adds new notifications to active', () => {
    const notification = generateNotification<any>({
      title: 'foo', kind: NotificationLevel.INFO
    })
    const newState = reducer(defaultState, actions.notificationAdded(notification))
    expect(newState.active).toEqual([...defaultState.active, notification])
  })

  it('removes from active and pushes to inactive', () => {
    const notification = generateNotification<any>({
      title: 'foo', kind: NotificationLevel.INFO
    })

    const initialState = {...defaultState, active: [notification] }
    const newState = reducer(initialState, actions.notificationRemoved(notification.id))

    expect(newState.active).toEqual([])
    expect(newState.inactive).toEqual([...initialState.inactive, notification])
  })

  it('prepends fetched notifications to inactive', async () => {
    const fetchedNotifications: Notification<any>[] = [
      generateNotification<any>({title: 'foo', kind: NotificationLevel.INFO}),
      generateNotification<any>({title: 'bar', kind: NotificationLevel.INFO}),
    ]

    const existingNotifications: Notification<any>[] = [
      generateNotification<any>({title: 'baz', kind: NotificationLevel.INFO}),
      generateNotification<any>({title: 'bag', kind: NotificationLevel.INFO}),
    ]

    const initialState = {...defaultState, inactive: existingNotifications}
    const nextState = reducer(initialState, actions.notificationsFetched(fetchedNotifications))
    expect(nextState.inactive).toEqual([...fetchedNotifications, ...existingNotifications])
  })

  it('makes API request and dispatches appropriate actions', async () => {
    const fetchedNotifications: Notification<any>[] = [
      generateNotification<any>({title: 'foo', kind: NotificationLevel.INFO}),
      generateNotification<any>({title: 'bar', kind: NotificationLevel.INFO}),
    ]

    const existingNotifications: Notification<any>[] = [
      generateNotification<any>({title: 'baz', kind: NotificationLevel.INFO}),
      generateNotification<any>({title: 'bag', kind: NotificationLevel.INFO}),
    ]

    fetchMock.mockOnce(JSON.stringify({
      status: 'OK',
      body: {
        notifications: fetchedNotifications,
        moreExists: false,
      }
    }))

    const store = mockStore({ notifications: {...defaultState, inactive: existingNotifications} });
    await store.dispatch(thunks.fetchNotificationsArchive)
    expect(fetch.mock.calls[0][0]).toMatch(`marker=${existingNotifications[0].id}`)
    expect(store.getActions())
      .toEqual([
        actions.notificationsArchiveExhausted(),
        actions.notificationsFetched(fetchedNotifications)
      ])
  })

  it('syncs persistent notifications with the backend', async () => {
    const notification = generateNotification<any>({title: 'foo', kind: NotificationLevel.INFO})
    const persistentNotification = generateNotification<any>({
      title: 'bar', kind: NotificationLevel.INFO, type: NotificationTypes.TORRENT_ADDED
    })

    fetchMock.mockIf(`/notifications`, async req => {
      if (req.method === 'POST') {
        return { body: { status: 'OK' } }
      }
    })

    const store = mockStore({ notifications: {...defaultState} });
    await store.dispatch(thunks.addNotification([notification, persistentNotification]))
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual([persistentNotification])
  })

  it('deletes notifications from client and backend', async () => {
    const notification = generateNotification<any>({title: 'foo', kind: NotificationLevel.INFO})

    fetchMock.mockIf(/\/notifications\/.*/, async req => {
      if (req.method === 'DELETE') {
        return { body: JSON.stringify({ status: 'OK' }) }
      } else {
        return { status: 400, body: { status: 'OK' } }
      }
    })

    const store = mockStore({ notifications: {...defaultState, inactive: [notification] } });
    await store.dispatch(thunks.deleteNotification(notification.id))
    expect(fetch.mock.calls.length).toBe(1)
    expect(store.getActions())
      .toEqual([
        actions.notificationDeleted(notification.id)
      ])
  })

  it('deletes inactive notifications from client', async () => {
    const notification = generateNotification<any>({title: 'foo', kind: NotificationLevel.INFO})
    const initialState = { ...defaultState, inactive: [notification] }
    const nextState = reducer(initialState, actions.notificationDeleted(notification.id))
    expect(nextState.inactive).toEqual([])
  })

  it('deletes active notifications from client', async () => {
    const notification = generateNotification<any>({title: 'foo', kind: NotificationLevel.INFO})
    const initialState = { ...defaultState, active: [notification] }
    const nextState = reducer(initialState, actions.notificationDeleted(notification.id))
    expect(nextState.active).toEqual([])
  })
})
