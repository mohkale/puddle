import './styles';
import React, { Fragment, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Transmission from '@puddle/transmission';
import AsyncButton from '@puddle/components/forms/async-button';

const DEFAULT_TRANSMISSION_ROUTE = `http://${window.location.host}${window.location.pathname}transmission`

export default function LoginView(props: { setTransmission: (Transmission) => void }) {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState<string>()
  const valueRef = useRef<HTMLInputElement>(null)

  const onSubmit = async () => {
    if (!valueRef.current) {
      console.warn('reference to value input box is undefined')
      return
    }
    const domain = valueRef.current!.value
    if (!domain) {
      throw `You must supply a value for Transmission Host.`
    }

    const transmission = new Transmission(domain)
    try { await transmission.session() } catch {
      throw `failed to exchange handshake, is transmission really there?.`
    }

    return transmission;
  }

  const onFailure = (err) => {
    setBanner(err.toString())
  }

  const onSuccess = (t: Transmission) => {
    props.setTransmission(t)
  }

  React.useEffect(() => {
    // automatically connect to the default, TODO remove.
    props.setTransmission(new Transmission(DEFAULT_TRANSMISSION_ROUTE));
  })

  return (
    <div className="login-container">
      <main>
        <h1>Connect to Transmission</h1>

        {banner &&
          <div className="banner error">{banner}</div>}

        <form action="">
          <label>
            Transmission Host:
            <input name="foo" type="text" placeholder="Host Path"
                   defaultValue={DEFAULT_TRANSMISSION_ROUTE}
                   ref={valueRef} />
          </label>
        </form>

        <hr/>

        <AsyncButton style={{float: 'right'}} run={onSubmit}
                     onFailure={onFailure} onSuccess={onSuccess}>
          Submit
        </AsyncButton>
      </main>
    </div>
  );
}
