import '@cstyles/views/login';
import React, { useState, useRef, useEffect } from 'react';

import {
  MessageList, MessageType, MessageLevel, AsyncButton
} from '@client/components';

import Transmission from '@transmission/client';
import { authenticate, authenticated, defaultTransmissionUrl } from '@server/api';

import store, {
  syncTorrents, syncStats, syncSession, viewChanged, ViewType
} from '@client/stores';

function startLoading() {
  const t = new Transmission()
  store.dispatch(viewChanged({ type: ViewType.LOADING }))

  store.dispatch(syncTorrents(t))
    .then(() => store.dispatch(syncStats(t)))
    .then(() => store.dispatch(syncSession(t)))
    .then(() => {
      store.dispatch(viewChanged({
        type: ViewType.CLIENT,
        transmission: t.serialise()
      }))
    })
}

export default function LoginView() {
  const [message, setMessage] = useState<MessageType|undefined>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState('')

  // skip forward to transmission when the the users already been authed.
  useEffect(() => { authenticated().then(ok => ok && startLoading()) }, [])

  useEffect(() => {
    defaultTransmissionUrl().then(url => {
      if (!inputRef.current?.value) {
        setUrl(url)
      }
    })
  }, [])

  const onSubmit = () => authenticate(url)
  const onFailure = err => setMessage({
    level: MessageLevel.ERROR, label: err.toString()
  })

  return (
    <div className="login-container">
      <main>
        <h1>Connect to Transmission</h1>

        {message && <MessageList messages={[message]} />}

        <label>
          Transmission Host:
          <div className="input-container">
            <input type="text" className="textbox"
                   value={url} ref={inputRef}
                   onChange={e => setUrl(e.target.value)}
                   placeholder="Host Path" />
          </div>
        </label>

        <hr/>

        <AsyncButton style={{float: 'right'}} run={onSubmit}
                     className="btn btn--submit"
                     onFailure={onFailure} onSuccess={startLoading}>
          Submit
        </AsyncButton>
      </main>
    </div>
  );
}
