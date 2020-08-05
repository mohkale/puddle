import { RootThunk } from '../../state';

import Transmission, {
  TransmissionPriorityType as PriorityType
} from '@puddle/transmission';

import {
  torrentDetailsOverlayAssigned,
  torrentDetailsOverlayTorrentUpdated,
  torrentDetailsOverlayTorrentAssigned
} from './actions';
import { selectTorrentDetailsOverlayTorrentId } from '../../selectors';

import { TORRENT_DETAILED_FIELDS } from '@puddle/models';
import { isPriorityType, ExtendedPriorityType } from '@puddle/components';

export const showTorrentDetails =
  (client: Transmission, id: number): RootThunk<Promise<void>> => {
    return async (dispatch) => {
      dispatch(torrentDetailsOverlayAssigned({ torrentId: id }))

      client.torrent(id, ...TORRENT_DETAILED_FIELDS)
        .then(torrent => {
          dispatch(torrentDetailsOverlayTorrentUpdated(torrent))
        })
    }
  }

export const updateTorrentDetails =
  (client: Transmission): RootThunk<Promise<void>> => {
    return async (dispatch, getState) => {
      const id = selectTorrentDetailsOverlayTorrentId(getState())
      client.torrent(id, ...TORRENT_DETAILED_FIELDS)
        .then(torrent => {
          dispatch(torrentDetailsOverlayTorrentUpdated(torrent))
        })
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
