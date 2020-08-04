import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState, RootThunk } from '../../state';
import Transmission, { TorrentId, TransmissionTorrent as TorrentResponse } from '@puddle/transmission';
import { torrentDetailsOverlayAssigned, torrentDetailsOverlayTorrentUpdated } from './actions';
import {
  TorrentDetailed,
  torrentDetailedFromResponse as torrentFromResponse,
  TORRENT_DETAILED_FIELDS
} from '@puddle/models';

export const showTorrentDetails =
  (client: Transmission, id: number): RootThunk<Promise<void>> => {
    return async (dispatch, getState) => {
      dispatch(torrentDetailsOverlayAssigned({ torrentId: id }))

      client.torrent(id, ...TORRENT_DETAILED_FIELDS)
        .then(torrent => {
          dispatch(torrentDetailsOverlayTorrentUpdated(torrent))
        })
    }
  }

export const updateTorrentDetails =
  (client: Transmission, id: number): RootThunk<Promise<void>> => {
    // TODO we can get id from the current state.
    return async (dispatch, getState) => {
      client.torrent(id, ...TORRENT_DETAILED_FIELDS)
        .then(torrent => {
          dispatch(torrentDetailsOverlayTorrentUpdated(torrent))
        })
    }
  }
