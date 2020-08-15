import { RootThunk } from '../../state';

import Transmission, {
  TransmissionPriorityType as PriorityType
} from '@transmission/client';

import {
  torrentDetailsOverlayAssigned,
  torrentDetailsOverlayTorrentUpdated,
  torrentDetailsOverlayTorrentAssigned
} from './actions';

import {
  selectTorrentDetailsOverlayTorrentId,
  selectTorrentDetailsOverlayTorrent
} from '../../selectors';

import { isPriorityType, ExtendedPriorityType } from '@client/components';
import {
  TORRENT_DETAILED_FIELDS, torrentDetailedFromResponse as fromResponse
} from '@client/models';

import { notifyRequestError } from '@client/stores/notifications-store';

export const showTorrentDetails =
  (client: Transmission, id: number): RootThunk<Promise<void>> => {
    return async (dispatch) => {
      dispatch(torrentDetailsOverlayAssigned({ torrentId: id }))

      client.torrent(id, ...TORRENT_DETAILED_FIELDS)
        .then(torrent => {
          const torrentDetailed = fromResponse(torrent)
          dispatch(torrentDetailsOverlayTorrentUpdated(torrentDetailed))
        })
    }
  }

export const updateTorrentDetails =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch, getState) => {
      const id = selectTorrentDetailsOverlayTorrentId(getState())

      try {
        client.torrent(id, ...TORRENT_DETAILED_FIELDS)
          .then(torrent => {
            const base = selectTorrentDetailsOverlayTorrent(getState())
            const torrentDetailed = fromResponse(torrent, base)
            dispatch(torrentDetailsOverlayTorrentUpdated(torrentDetailed))
          })
      } catch (err) {
        dispatch(notifyRequestError({
          to: 'transmission', errorMessage: err, description: `fetching torrent details for ${id}`
        }))
      }
    }
  }

export const setFilePriorities =
  (client: Transmission, fileIds: number[],
   priority: ExtendedPriorityType): RootThunk<Promise<void>> => {
    return async (dispatch, getState) => {
      const state = getState()
      const torrentId = state.overlays.torrentDetails.torrentId
      const fileStats = state.overlays.torrentDetails.torrent!.fileStats

      // TODO cleanup, too much repitition
      if (isPriorityType(priority)) {
        switch (priority) {
          case PriorityType.HIGH:
            await client.setTorrent(torrentId, { 'files-wanted': fileIds, 'priority-high': fileIds })
            break;
          case PriorityType.NORM:
            await client.setTorrent(torrentId, { 'files-wanted': fileIds, 'priority-normal': fileIds })
            break;
          case PriorityType.LOW:
            await client.setTorrent(torrentId, { 'files-wanted': fileIds, 'priority-low': fileIds })
            break;
        }
      } else {
        await client.setTorrent(torrentId, { 'files-unwanted': fileIds })
      }

      dispatch(torrentDetailsOverlayTorrentAssigned({
        fileStats: fileStats.map((stat, i) => {
          if (!fileIds.includes(i)) {
            return stat
          }

          return {
            ...stat,
            wanted: isPriorityType(priority) ? stat.wanted : false,
            priority: isPriorityType(priority) ? priority : stat.priority,
          }
        })
      }))
    }
  }
