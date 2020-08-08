import '@cstyles/overlays/torrent-add';
import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { overlayRemoved } from '@puddle/stores';
import {
  ClientContext, LabelSelector, SelectOption, MessageType
} from '@puddle/components';

import { onSubmitGeneral } from '../on-submit';
import { URLInput } from '../controls/url-input';
import { Row, Form } from '../../settings/controls';
import { sessionSelector, useStateFromSelector } from '../../settings/utils';

export function ByUrl() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const [messages, setMessages] = useState<MessageType[]>([])

  const [urls, setUrls] = useState<string[]>([''])
  const [labels, setLabels] = useState<SelectOption<string>[]>([])
  const [destination, setDestination] = useStateFromSelector(sessionSelector(s => s['download-dir']))

  const onSubmit = () =>
    onSubmitGeneral(
      transmission,
      urls,
      labels.map(l => l.value),
      destination,
      (urls) => setUrls(urls || ['']),
      setMessages,
      (url) => ({ filename: url }),
      (url, i, error) => url === undefined ? error : `URL ${i} ${error}`,
    )

  const onSuccess = () => { dispatch(overlayRemoved()) }

  return (
    <Form onSubmit={onSubmit} onSuccess={onSuccess} messages={messages}>
      <Row>
        <label>Torrents</label>
        <URLInput urls={urls} setUrls={setUrls} />
      </Row>

      <Row>
        <label>Destination</label>
        <input type="text" className="textbox"
          value={destination} onChange={e => setDestination(e.target.value)} />
      </Row>

      <Row>
        <label>Tags</label>
        <LabelSelector
          onChange={setLabels}
          selectedLabels={labels} />
      </Row>
    </Form>
  )
}
