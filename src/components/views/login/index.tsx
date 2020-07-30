import './styles';
import React, { Fragment, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Transmission from '@puddle/transmission';
import AsyncButton from '@puddle/components/forms/async-button';

import { viewChanged, ViewType } from '@puddle/stores';
import appStore from '@puddle/stores';
import store, {
  syncTorrents, syncStats, syncStatsLimits, selectCurrentView
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
  appStore.dispatch(viewChanged({ type: ViewType.LOADING }))

  const setupPromise =  appStore.dispatch(syncTorrents(t))
    .then(() => appStore.dispatch(syncStats(t)))
    .then(() => appStore.dispatch(syncStatsLimits(t)))
    .then(() => {
      appStore.dispatch(viewChanged({
        type: ViewType.CLIENT,
        transmission: t.serialise()
      }))
    })
}

// automatically connect to the default, TODO remove.
startLoading(new Transmission(DEFAULT_TRANSMISSION_ROUTE));

export default function LoginView(props: { setTransmission: (Transmission) => void }) {
  const dispatch = useDispatch();
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
            <input name="host" type="text" placeholder="Host Path"
                   defaultValue={DEFAULT_TRANSMISSION_ROUTE}
                   ref={valueRef} />
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
