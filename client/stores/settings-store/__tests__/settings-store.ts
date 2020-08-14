import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

import reducer from '../index';
import * as thunks from '../thunks';
import * as actions from '../actions';
import defaultState from '../default';
import { SettingsUpdatedProps } from '../thunks';
import { SettingsState, ColumnType } from '../state';

import { TorrentFields } from '@client/models';

const mockStore = configureStore([thunk])

describe('settings', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('syncs when updated and sync is specified', async () => {
    const newSettings: thunks.SettingsUpdatedProps = {
      columnOrder: [TorrentFields.QUEUE_POSITION]
    }

    fetchMock.mockIf('/settings', async req => ({ body: {status: 'OK'} }))

    const store = mockStore({ settings: {...defaultState} });
    await store.dispatch(thunks.updateSettings(newSettings, true))
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual(newSettings)
  })

  it("doesn't sync when updated and sync isn't denied", async () => {
    const newSettings: thunks.SettingsUpdatedProps = {
      columnOrder: [TorrentFields.QUEUE_POSITION]
    }

    fetchMock.mockIf('/settings', async req => ({ body: {status: 'OK'} }))

    const store = mockStore({ settings: {...defaultState} });
    await store.dispatch(thunks.updateSettings(newSettings, false))
    expect(JSON.parse(fetch.mock.calls.length)).toBe(0)
  })

  it('updates column widths', () => {
    const columnWidths: SettingsUpdatedProps['columnWidths'] = Object.fromEntries(
      Object.values(ColumnType)
        .filter(i => Number.isInteger(i))
        .map(i => [i, Math.floor(Math.random() * 1000)] as [ColumnType, number]))

    const nextState = reducer(defaultState, actions.settingsUpdated({ columnWidths }))
    expect(
      Object.fromEntries(
        Object.entries(nextState.columns.entries)
          .map(([type, val]) => [type, val.width]))
    ).toEqual(columnWidths)
  })

  it('updates column order', () => {
    const columnOrder: ColumnType[] = Object.values(ColumnType)
      .filter(i => Number.isInteger(i))
      .sort(() => Math.random() - 0.5)

    const nextState = reducer(defaultState, actions.settingsUpdated({ columnOrder }))
    expect(nextState.columns.order).toEqual(columnOrder)
  })

  it('can resize a column', () => {
    const delta = 100, field = TorrentFields.QUEUE_POSITION
    const nextState = reducer(defaultState, actions.columnResized({ field, delta }))
    const actual = nextState.columns.entries[field].width,
          expected = defaultState.columns.entries[field].width+delta
    expect(actual).toBe(expected)
  })
})
