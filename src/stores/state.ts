import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { TorrentState } from './torrents-store';
import { StatsState } from './stats-store';
import { SettingsState } from './settings-store';
import { UIState } from './ui-store';
import { NotificationsState } from './notifications-store';

export interface RootState {
  ui: UIState
  stats: StatsState
  torrents: TorrentState
  settings: SettingsState
  notifications: NotificationsState
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type RootThunk<ReturnType=void, ActionType=any> =
  ThunkAction<ReturnType, RootState, unknown, Action<ActionType>>;
