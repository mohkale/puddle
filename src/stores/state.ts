import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { TorrentState } from './torrents-store';
import { StatsState } from './stats-store';
import { SettingsState } from './settings-store';

export interface RootState {
  torrents: TorrentState
  settings: SettingsState
  stats: StatsState
}

export type RootThunk<ReturnType=void, ActionType=any> =
  ThunkAction<ReturnType, RootState, unknown, Action<ActionType>>;
