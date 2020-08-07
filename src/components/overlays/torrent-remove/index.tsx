import '@cstyles/overlays/torrent-remove';
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  overlayRemoved, selectRemoveTorrentOverlayTorrentIds,
} from '@puddle/stores'
import { ClientContext, Checkbox, AsyncButton } from '@puddle/components';

import Modal from '../modal';

export default function TorrentRemove() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const ids = useSelector(selectRemoveTorrentOverlayTorrentIds)
  const [deleteData, setDeleteData] = useState(false)

  const removeOverlay = () => dispatch(overlayRemoved())
  const onSubmit = () =>
    transmission.removeTorrent(ids, deleteData)

  return (
    <Modal title="Remove Torrent" className="torrent-remove">
      <p>
        Are you sure you want to remove <span className="highlight">{ids.length}</span> torrents?
      </p>

      <Checkbox
        isChecked={deleteData} onCheck={setDeleteData}
        label="Delete Downloaded Files as Well." />

      <div className="submission-controls">
        <button onClick={removeOverlay} className="btn">Cancel</button>
        <AsyncButton run={onSubmit} onSuccess={removeOverlay} className="btn btn--submit">
          Submit
        </AsyncButton>
      </div>
    </Modal>
  )
}

