import '@cstyles/views/login';
import React, { useState, useRef } from 'react';

import Transmission from '@puddle/transmission';
import { AsyncButton } from '@puddle/components';

import store, {
  syncTorrents, syncStats, syncSession,
  viewChanged, ViewType
} from '@puddle/stores';

const DEFAULT_TRANSMISSION_ROUTE = `http://${window.location.host}${window.location.pathname}transmission`

async function checkConnection(domain: string) {
  if (!domain) {
    throw `You must supply a value for Transmission Host.`
  }

  const transmission = new Transmission(domain)
  try { await transmission.session() } catch {
    throw `failed to exchange handshake, is transmission really there?.`
  }

  return transmission;
}

function startLoading(t: Transmission) {
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

// automatically connect to the default, TODO remove.
startLoading(new Transmission(DEFAULT_TRANSMISSION_ROUTE));

export default function LoginView() {
  const [banner, setBanner] = useState<string>()
  const valueRef = useRef<HTMLInputElement>(null)

  const onSubmit = async () => {
    if (!valueRef.current) {
      console.warn('reference to value input box is undefined')
      return
    }
    return await checkConnection(valueRef.current!.value)
  }

  const onFailure = (err) => setBanner(err.toString())

  return (
    <div className="login-container">
      <main>
        <h1>Connect to Transmission</h1>

        {banner &&
          <div className="banner error">{banner}</div>}

        <form>
          <label>
            Transmission Host:
            <input name="host" type="text" className="textbox"
                   defaultValue={DEFAULT_TRANSMISSION_ROUTE}
                   ref={valueRef} placeholder="Host Path" />
          </label>
        </form>

        <hr/>

        <AsyncButton style={{float: 'right'}} run={onSubmit}
                     onFailure={onFailure} onSuccess={startLoading}>
          Submit
        </AsyncButton>
      </main>
    </div>
  );
}
