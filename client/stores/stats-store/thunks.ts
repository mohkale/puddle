import Transmission from '@transmission/client';

import { RootThunk } from '../state';
import { statsUpdated, limitsUpdated } from './actions';

import { sessionUpdated } from '@client/stores/settings-store';
import { notifyRequestError } from '@client/stores/notifications-store';

export const syncStats =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch) => {
      try {
        dispatch(statsUpdated(await client.sessionStats()))
      } catch (err) {
        dispatch(notifyRequestError({
          to: 'transmission', errorMessage: err.toString(), description: 'syncing transmission session stats'
        }))
      }
    }
  }

export const syncSession =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch) => {
      try {
        const resp = await client.session()
        dispatch(limitsUpdated(resp))
        dispatch(sessionUpdated(resp))
      } catch (err) {
        dispatch(notifyRequestError({
          to: 'transmission', errorMessage: err.toString(), description: 'syncing transmission session'
        }))
      }
    }
  }
