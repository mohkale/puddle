import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { syncSession, notifyRequestError } from '@client/stores';
import {
  Select, Checkbox, ClientContext, NumberInput, MessageType, MessageLevel
} from '@client/components';
import { TransmissionSessionEncryption as SessionEncryption } from '@transmission';

import { Form, Section, Row } from '../../controls';
import { sessionSelector, useStateFromSelector } from '../../utils';

const ENCRYPTION_OPTIONS = Object.values(SessionEncryption)
  .map(value => ({
    label: value[0].toUpperCase() + value.slice(1), value
  }))

export function PeersView() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const [messages, setMessages] = useState<MessageType[]>([])

  const [usePex, setUsePex] = useStateFromSelector(sessionSelector(s => s['pex-enabled']))
  const [useDht, setUseDht] = useStateFromSelector(sessionSelector(s => s['dht-enabled']))
  const [useLpd, setUseLpd] = useStateFromSelector(sessionSelector(s => s['lpd-enabled']))
  const [enableBlocklist, setEnableBlocklist] = useStateFromSelector(sessionSelector(s => s['blocklist-enabled']))
  const [blocklistUrl, setBlocklistUrl] = useStateFromSelector(sessionSelector(s => s['blocklist-url']))
  const [peerLimitGlobal, setPeerLimitGlobal] = useStateFromSelector(sessionSelector(s => s['peer-limit-global']))
  const [peerLimit, setPeerLimit] = useStateFromSelector(sessionSelector(s => s['peer-limit-per-torrent']))
  const [encryption, setEncryption] = useStateFromSelector(sessionSelector(s => s['encryption']))

  const selectedEncryptionOption = ENCRYPTION_OPTIONS.find(o => o.value === encryption)

  const onSubmit = async () => {
    const newMessages: MessageType[] = []
    let failed = false
    if (isNaN(peerLimit)) {
      newMessages.push({ level: MessageLevel.ERROR, label: 'peers per torrent must be a number' })
      failed = true
    }

    if (isNaN(peerLimitGlobal)) {
      newMessages.push({ level: MessageLevel.ERROR, label: 'global peer limit must be a number' })
      failed = true
    }

    setMessages(newMessages)
    if (failed) return false

    try {
      await transmission.setSession({
        'pex-enabled': usePex,
        'dht-enabled': useDht,
        'lpd-enabled': useLpd,
        'blocklist-enabled': enableBlocklist,
        'blocklist-url': blocklistUrl,
        'peer-limit-global': peerLimitGlobal,
        'peer-limit-per-torrent': peerLimit,
        'encryption': encryption,
      })

      setMessages([{ level: MessageLevel.INFO, label: 'succesfully synced settings' }])
      await dispatch(syncSession(transmission))
    } catch (err) {
      setMessages([{ level: MessageLevel.ERROR, label: 'failed to sync settings with transmission' }])
      await dispatch(notifyRequestError({
        to: 'transmission', errorMessage: err, description: 'syncing transmission session settings'
      }))
    }
  }

  return (
    <Form onSubmit={onSubmit} messages={messages}>
      <Section title="Connections">
        <Row>
          <label>Max peers per torrent</label>
          <NumberInput className="textbox" value={peerLimit} setValue={setPeerLimit} />
        </Row>

        <Row>
          <label>Max peers overall</label>
          <NumberInput className="textbox" value={peerLimitGlobal} setValue={setPeerLimitGlobal} />
        </Row>
      </Section>

      <Section title="Options">
        <Row>
          <label>Encryption mode</label>
          <Select
            options={ENCRYPTION_OPTIONS}
            value={selectedEncryptionOption}
            onChange={(p) => setEncryption(p.value)}
            isSearchable={false} />
        </Row>

        <Row>
          <Checkbox
            isChecked={usePex}
            onCheck={setUsePex}
            label="Use PEX to find more peers" />
        </Row>

        <Row>
          <Checkbox
            isChecked={useDht}
            onCheck={setUseDht}
            label="Use DHT to find more peers" />
        </Row>

        <Row>
          <Checkbox
            isChecked={useLpd}
            onCheck={setUseLpd}
            label="Use LPD to find more peers" />
        </Row>
      </Section>

      <Section title="Blocklist">
        <Row>
          <Checkbox
            isChecked={enableBlocklist}
            onCheck={setEnableBlocklist}
            label="Enable blocklist" />

          <input
            disabled={!enableBlocklist} type="text" className="textbox"
            value={blocklistUrl} onChange={(e) => setBlocklistUrl(e.target.value)} />
        </Row>
      </Section>
    </Form>
  )
}
