import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { sessionSelector, useStateFromSelector } from '../utils';
import { syncSession } from '@puddle/stores';
import { Form, Section, Row } from '../controls';

import {
  Checkbox, ClientContext, NumberInput, MessageType, MessageLevel
} from '@puddle/components';

export function NetworkView() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const [messages, setMessages] = useState<MessageType[]>([])

  const [randomizePortOnLaunch, setRandomizePortOnLaunch] = useStateFromSelector(sessionSelector(s => s['peer-port-random-on-start']))
  const [usePortForwarding, setUsePortForwarding] = useStateFromSelector(sessionSelector(s => s['port-forwarding-enabled']))
  const [enableUTP, setEnableUTP] = useStateFromSelector(sessionSelector(s => s['utp-enabled']));
  const [peerPort, setPeerPort] = useStateFromSelector(sessionSelector(s => s['peer-port']));

  const onSubmit = () => {
    setMessages([])
    if (isNaN(peerPort) || peerPort === 0) {
      setMessages([{ level: MessageLevel.ERROR, label: 'port number must be a valid non-zero number' }])
      return
    }

    // TODO handle error
    return transmission.setSession({
      'peer-port-random-on-start': randomizePortOnLaunch,
      'port-forwarding-enabled': usePortForwarding,
      'utp-enabled': enableUTP,
      'peer-port': peerPort,
    }).then(() => setMessages([{ level: MessageLevel.INFO, label: 'succesfully synced settings' }]))
      .then(() => dispatch(syncSession(transmission)))
  }

  return (
    <Form onSubmit={onSubmit} messages={messages}>
      <Section title="Listening Port">
        <Row>
          <label>Peer listening port</label>
          <NumberInput value={peerPort} setValue={setPeerPort} />
        </Row>

        <Row>
          <Checkbox
            isChecked={randomizePortOnLaunch}
            onCheck={setRandomizePortOnLaunch}
            label="Randomize port on launch" />
        </Row>

        <Row>
          <Checkbox
            isChecked={usePortForwarding}
            onCheck={setUsePortForwarding}
            label="Use port forwarding from my router" />
        </Row>

        <Row>
          <Checkbox
            isChecked={enableUTP}
            onCheck={setEnableUTP}
            label="enabled uTP for peer communication" />
        </Row>
      </Section>
    </Form>
  )
}