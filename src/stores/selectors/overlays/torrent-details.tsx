import { RootState } from '../../state';
import { safeDivide } from '@puddle/utils';
import { constructFileTree, FileTreeEntry, scaleBytes } from '@puddle/utils';
import { createSelector } from '@reduxjs/toolkit';
import {
  BandwidthPrioritySlider, isPriorityType, ExtendedPriorityType
} from '@puddle/components';

export const selectTorrentDetailsOverlayTorrentId =
  (state: RootState) => state.overlays.torrentDetails.torrentId

export const selectTorrentDetailsTorrentAssigned =
  createSelector(
    [(state: RootState) => state.overlays.torrentDetails.torrent],
    (torrent) => torrent !== undefined)

export const selectTorrentDetailsOverlayTorrent =
  (state: RootState) => state.overlays.torrentDetails.torrent

export const selectTorrentDetailsOverlaySelectedFiles =
  (state: RootState) => state.overlays.torrentDetails.selectedFiles

const selectTorrentDetailsOverlaySelectedFilesSet =
  createSelector(
    [selectTorrentDetailsOverlaySelectedFiles],
    (selected) => new Set(selected))

const selectTorrentDetailsOverlayIsFileSelected = (id: number) =>
  createSelector(
    [selectTorrentDetailsOverlaySelectedFilesSet],
    (selectedFiles) => selectedFiles.has(id))

export const selectTorrentDetailsOverlayFiles =
  (state: RootState) => state.overlays.torrentDetails.torrent!.files

export const selectTorrentDetailsOverlayFileProps = (id: number) =>
  createSelector(
    [(state: RootState) => state.overlays.torrentDetails.torrent!.files[id],
     (state: RootState) => state.overlays.torrentDetails.torrent!.fileStats[id],
     selectTorrentDetailsOverlayIsFileSelected(id)],
    (file, stats, isSelected) => {
      const wanted = stats.wanted

      return {
        isSelected: isSelected,
        size: file.length,
        priority: (wanted ? stats.priority : 'dont-download') as ExtendedPriorityType,
        percentageComplete: safeDivide(file.bytesCompleted, file.length),
      }
    }
  )
