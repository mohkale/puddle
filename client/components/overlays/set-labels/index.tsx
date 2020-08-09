import '@cstyles/overlays/set-labels';
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectSetLabelsOverlayTorrentIds, selectLabelsById,
  overlayRemoved, updateTorrent
} from '@client/stores'
import { setsEqual } from '@client/utils'
import { ClientContext, LabelSelector } from '@client/components';

import Modal from '../modal';
import { Form } from '../settings/controls';

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
    <Modal title="Set Tags" className="set-labels">
      <Form onSubmit={onSubmit} messages={[]} onSuccess={removeOverlay}>
        <LabelSelector
          onChange={setSelectedLabels}
          selectedLabels={selectedLabels} />
      </Form>
    </Modal>
  )
}
