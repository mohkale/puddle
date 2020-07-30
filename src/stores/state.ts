import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { TorrentState } from './torrents-store';
import { StatsState } from './stats-store';
import { SettingsState } from './settings-store';
import { UIState } from './ui-store';

export interface RootState {
  ui: UIState
  stats: StatsState
  torrents: TorrentState
  settings: SettingsState
}

export type RootThunk<ReturnType=void, ActionType=any> =
  ThunkAction<ReturnType, RootState, unknown, Action<ActionType>>;
