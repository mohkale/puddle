import '@cstyles/overlays/set-labels';
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectSetLabelsOverlayTorrentIds, selectLabelsById,
  overlayRemoved, updateTorrent
} from '@puddle/stores'
import { setsEqual } from '@puddle/utils'
import { ClientContext, AsyncButton } from '@puddle/components';

import OverlayContainer from '../container';
import { LabelSelector } from './label-selector';

export default function SetLabels() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const ids = useSelector(selectSetLabelsOverlayTorrentIds)
  const idsWithLabels = useSelector(selectLabelsById(ids))
  const [selectedLabels, setSelectedLabels] = useState(() => {
    if (setsEqual(Object.values(idsWithLabels))) {
      return idsWithLabels[ids[0]]
        .map(label => ({ label, value: label }))
    }
    return []
  })

  if (ids.length === 0)
    return null

  const removeOverlay = () => dispatch(overlayRemoved())
  const onSubmit = () =>
    transmission.setTorrent(ids, { labels: selectedLabels.map(t => t.value) })
      .then(() => dispatch(updateTorrent(ids, transmission)))

  return (
    <OverlayContainer>
      <div className={`modal set-labels`}>
        <header>
          <h1>Set Tags</h1>
        </header>
        <div className="modal-body">
          <LabelSelector
            onChange={setSelectedLabels}
            selectedLabels={selectedLabels} />

          <div className="submission-controls">
            <button onClick={removeOverlay}>Cancel</button>
            <AsyncButton run={onSubmit} onSuccess={removeOverlay}>
              Submit
            </AsyncButton>
          </div>
        </div>
      </div>
    </OverlayContainer>
  )
}

