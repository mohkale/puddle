import '@cstyles/overlays/set-location';
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectSetLocationOverlayTorrentIds,
  overlayRemoved, selectLocationById,
  selectDefaultDownloadDir
} from '@puddle/stores'
import { setsEqual } from '@puddle/utils'

import Modal from '../modal';
import { Form, Row } from '../settings/controls';

import {
  Checkbox, MessageType, MessageLevel, ClientContext
} from '@puddle/components';

export default function SetLocation() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const defaultLocation = useSelector(selectDefaultDownloadDir)

  const [messages, setMessages] = useState<MessageType[]>([])
  const ids = useSelector(selectSetLocationOverlayTorrentIds)
  const locations = useSelector(selectLocationById(ids))
  const [location, setLocation] = useState(() =>
    setsEqual(Object.values(locations)) ?
      locations[ids[0]] : defaultLocation)
  const [moveFiles, setMoveFiles] = useState(false);

  if (ids.length === 0)
    return null

  const removeOverlay = () => dispatch(overlayRemoved())
  const onSubmit = async () => {
    setMessages([])
    try {
      await transmission.setTorrentLocation(ids, location, moveFiles)
    } catch (err) {
      setMessages([{ level: MessageLevel.ERROR, label: err.result || 'failed to set location' }])
    }
  }

  return (
    <Modal title="Set Location" className="set-location">
      <Form onSubmit={onSubmit} messages={messages} onSuccess={removeOverlay}>
        <Row>
          <input type="text" className="textbox"
            value={location} onChange={e => setLocation(e.target.value)} />

          <Checkbox isChecked={moveFiles} onCheck={setMoveFiles} label="Move existing files"  />
        </Row>
      </Form>
    </Modal>
  )
}
