import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './state';
export * from './thunks';

import defaultState from './default';
import * as actions from './actions';
import { overlayRemoved } from '../actions';

import {
  FileTreeEntry as FileTree, treeTraverse, constructFileTree,
  arrayRemove, setDifference, dirNames
} from '@client/utils';

function treeRecursiveReduce(dirs: Set<string>, files: Set<number>, tree: FileTree, root?: string) {
  Object.entries(tree)
    .forEach(([name, val]) => {
      if (Number.isInteger(val)) {
        files.add(val)
      } else {
        const path = root ? `${root}/${name}` : name
        dirs.add(path)
        treeRecursiveReduce(dirs, files, val, path)
      }
    })
}

const torrentDetailsOverlaySlice = createSlice({
  name: 'torrent-details-overlay',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(overlayRemoved, (state) => {
        Object.assign(state, defaultState);
      })
      .addCase(actions.torrentDetailsOverlayAssigned, (state, action) => {
        state.torrentId = action.payload.torrentId
      })
      .addCase(actions.torrentDetailsOverlayTorrentUpdated, (state, action) => {
        state.torrent = action.payload

        // update file list... in case it was just fetched, it might be
        // worth coming up with a better check than simply file count :/.
        if (action.payload.files.length !== state.fileTree.fileCount) {
          state.fileTree = {
            tree: constructFileTree(state.torrent.files),
            fileCount: action.payload.files.length
          }
        }
      })
      .addCase(actions.torrentDetailsOverlayTorrentAssigned, (state, action) => {
        Object.assign(state.torrent, action.payload)
      })
      .addCase(actions.torrentDetailsOverlaySelectFiles, (state, action) => {
        // NOTE we may want to check for any directories that have been fully
        // selected and then mark them as such. Might be performance expensive
        // TODO come back to.
        state.selectedFiles = [...state.selectedFiles, action.payload.id]
      })
      .addCase(actions.torrentDetailsOverlayDeselectFiles, (state, action) => {
        // const payloadIds = new Set([action.payload])
        arrayRemove(state.selectedFiles, action.payload.id)

        // remove selected mark from any directories containing the deselected file
        const deselectedDirs = new Set<string>(dirNames(action.payload.path))
        state.selectedDirectories = state.selectedDirectories.filter(dir => !deselectedDirs.has(dir))
      })
      .addCase(actions.torrentDetailsOverlaySelectDirectory, (state, action) => {
        if (state.selectedDirectories.includes(action.payload))
          return // this should never happen, but just in case

        const selectedDirs = new Set<string>([...state.selectedDirectories, action.payload]),
              selectedFiles = new Set<number>([...state.selectedFiles]);

        const treeRoot = treeTraverse(state.fileTree.tree, action.payload)
        // this condition should always be true as well... but just in case.
        if (treeRoot && !Number.isInteger(treeRoot))
          treeRecursiveReduce(selectedDirs, selectedFiles, treeRoot as FileTree, action.payload)

        state.selectedDirectories = [...selectedDirs]
        state.selectedFiles = [...selectedFiles]
      })
      .addCase(actions.torrentDetailsOverlayDeselectDirectory, (state, action) => {
        // Awww Yeah!! Time for some heavy optimizations.
        const removedDirs = new Set([action.payload]),
              removedFiles: Set<number> = new Set();

        const treeRoot = treeTraverse(state.fileTree.tree, action.payload)
        if (treeRoot && !Number.isInteger(treeRoot))
          treeRecursiveReduce(removedDirs, removedFiles, treeRoot as FileTree, action.payload)

        state.selectedFiles = setDifference(state.selectedFiles, removedFiles)
        // for directories we also need to unmark any parent directories of the current dir
        state.selectedDirectories = setDifference(state.selectedDirectories, removedDirs)
          .filter(dir => action.payload.indexOf(dir) !== 0)
      })
      .addCase(actions.torrentDetailsOverlayClearFileSelection, (state) => {
        state.selectedFiles = []
        state.selectedDirectories = []
      })
})

export default torrentDetailsOverlaySlice.reducer
