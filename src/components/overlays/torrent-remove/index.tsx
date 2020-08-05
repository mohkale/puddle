import '@cstyles/overlays/torrent-remove';
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  overlayRemoved, selectRemoveTorrentOverlayTorrentIds,
} from '@puddle/stores'
import { ClientContext, Checkbox, AsyncButton } from '@puddle/components';

import OverlayContainer from '../container';

export default function TorrentRemove() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const ids = useSelector(selectRemoveTorrentOverlayTorrentIds)
  const [deleteData, setDeleteData] = useState(false)

  const removeOverlay = () => dispatch(overlayRemoved())
  const onSubmit = () =>
    transmission.removeTorrent(ids, deleteData)

  return (
    <OverlayContainer>
      <div className={`modal torrent-remove`}>
        <header>
          <h1>Remove Torrent</h1>
        </header>

        <p>
          Are you sure you want to remove <span className="highlight">{ids.length}</span> torrents?
        </p>

        <label>
          <Checkbox isChecked={deleteData} onCheck={setDeleteData} />
          <span>Delete Downloaded Files as Well.</span>
        </label>

        <div className="submission-controls">
          <button onClick={removeOverlay}>Cancel</button>
          <AsyncButton run={onSubmit} onSuccess={removeOverlay}>
            Submit
          </AsyncButton>
        </div>
      </div>
    </OverlayContainer>
  )
}

