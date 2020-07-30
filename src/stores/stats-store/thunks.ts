import Transmission from '@puddle/transmission';

import { RootThunk } from '../state';
import { statsUpdated, limitsUpdated } from './actions';

export const syncStats =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch) => {
      const resp = await client.sessionStats()
      dispatch(statsUpdated(resp))
    }
  }

export const syncStatsLimits =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch) => {
      const resp = await client.session()
      dispatch(limitsUpdated(resp))
    }
  }
