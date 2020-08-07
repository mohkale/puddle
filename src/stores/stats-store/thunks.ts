import Transmission from '@puddle/transmission';

import { RootThunk } from '../state';
import { statsUpdated, limitsUpdated } from './actions';
import { sessionUpdated } from '../settings-store';

export const syncStats =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch) => {
      const resp = await client.sessionStats()
      dispatch(statsUpdated(resp))
    }
  }

export const syncSession =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch) => {
      const resp = await client.session()
      dispatch(limitsUpdated(resp))
      dispatch(sessionUpdated(resp))
    }
  }
