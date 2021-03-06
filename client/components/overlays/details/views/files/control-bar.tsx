import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Select, ExtendedPriorityType, PRIORITY_LABELS, ClientContext
} from '@client/components';

import { TransmissionPriorityType as PriorityType } from '@transmission';

import {
  selectTorrentDetailsOverlaySelectedFiles,
  torrentDetailsOverlayClearFileSelection,
  setFilePriorities
} from '@client/stores';

const PRIORITY_SELECT_OPTIONS: { value: ExtendedPriorityType, label: string }[] = [
  { value: 'dont-download', label: PRIORITY_LABELS['dont-download'] },
  { value: PriorityType.LOW, label: PRIORITY_LABELS[PriorityType.LOW] },
  { value: PriorityType.NORM, label: PRIORITY_LABELS[PriorityType.NORM] },
  { value: PriorityType.HIGH, label: PRIORITY_LABELS[PriorityType.HIGH] },
];

export function SubmissionControls() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const selectedFiles = useSelector(selectTorrentDetailsOverlaySelectedFiles)
  if (selectedFiles.length === 0)
    return null

  const clearSelected = () => dispatch(torrentDetailsOverlayClearFileSelection())

  const handlePriorityChange = (p: { value: ExtendedPriorityType }) => {
    dispatch(setFilePriorities(transmission, selectedFiles, p.value))
  }

  return (
    <div className="submission-controls">
      <p>
        <span className="highlight">{selectedFiles.length}</span> selected files
      </p>

      <button onClick={clearSelected} className="btn">Clear Selection</button>

      <Select
        menuPlacement="top"
        isSearchable={false}
        options={PRIORITY_SELECT_OPTIONS}
        onChange={handlePriorityChange}
        placeholder="Select a Priority" />
    </div>
  )
}

