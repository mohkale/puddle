import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { sessionSelector, useStateFromSelector  } from '../../utils';
import { Form, Section, Row } from '../../controls';

import { syncSession } from '@client/stores';
import {
  NumberInput, Checkbox, ClientContext, MessageType, MessageLevel
} from '@client/components';

export function TorrentsView() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const [messages, setMessages] = useState<MessageType[]>([])

  const [downloadDir, setDownloadDir] = useStateFromSelector(sessionSelector(s => s['download-dir']))
  const [startWhenAdded, setStartWhenAdded] = useStateFromSelector(sessionSelector(s => s['start-added-torrents']))
  const [appendToIncomplete, setAppendToIncomplete] = useStateFromSelector(sessionSelector(s => s['rename-partial-files']))
  const [stopSeedingRatio, setStopSeedingRatio] = useStateFromSelector(sessionSelector(s => s['seedRatioLimit']))
  const [enableStopSeedingRatio, setEnableStopSeedingRatio] = useStateFromSelector(sessionSelector(s => s['seedRatioLimited']))
  const [stopSeedingIdleDuration, setStopSeedingIdleDuration] = useStateFromSelector(sessionSelector(s => s['idle-seeding-limit']))
  const [enableStopSeedingIdleDuration, setEnableStopSeedingIdleDuration] = useStateFromSelector(sessionSelector(s => s['idle-seeding-limit-enabled']))

  const onSubmit = () => {
    const newMessages: MessageType[] = []
    let failed = false;
    if (downloadDir.trim() === '') {
      newMessages.push({ level: MessageLevel.ERROR, label: 'download directory cannot be an empty path' })
      failed = true
    }

    if (isNaN(stopSeedingRatio)) {
      newMessages.push({ level: MessageLevel.ERROR, label: 'stop seeding ratio must be a valid number' })
      failed = true
    }

    if (isNaN(stopSeedingIdleDuration)) {
      newMessages.push({ level: MessageLevel.ERROR, label: 'stop seeding idle duration must be a valid number' })
      failed = true
    }

    setMessages(newMessages)
    if (failed) return

    // TODO show error message on failure
    transmission.setSession({
      'download-dir': downloadDir,
      'start-added-torrents': startWhenAdded,
      'rename-partial-files': appendToIncomplete,
      'seedRatioLimit': stopSeedingRatio,
      'seedRatioLimited': enableStopSeedingRatio,
      'idle-seeding-limit': stopSeedingIdleDuration,
      'idle-seeding-limit-enabled': enableStopSeedingIdleDuration,
    }).then(() => setMessages([{ level: MessageLevel.INFO, label: 'succesfully synced settings' }]))
      .then(() => dispatch(syncSession(transmission)))
  }

  return (
    <Form onSubmit={onSubmit} messages={messages}>
      <Section title="Downloading">
        <Row>
          <label>Download to</label>
          <input
            type="text" className="textbox"
            style={{ width: '100%', marginLeft: '25px' }}
            value={downloadDir} onChange={(e) => setDownloadDir(e.target.value)} />
        </Row>

        <Row>
          <Checkbox
            isChecked={startWhenAdded}
            onCheck={setStartWhenAdded}
            label="Start when added" />
        </Row>

        <Row>
          <Checkbox
            isChecked={appendToIncomplete}
            onCheck={setAppendToIncomplete}
            label="Append '.part' to incomplete files' names" />
        </Row>
      </Section>

      <Section title="Seeding">
        <Row>
          <Checkbox
            isChecked={enableStopSeedingRatio}
            onCheck={setEnableStopSeedingRatio}
            label="Stop seeding at ratio" />

          <NumberInput
            className="textbox"
            disabled={!enableStopSeedingRatio}
            value={stopSeedingRatio}
            setValue={setStopSeedingRatio} />
        </Row>

        <Row>
          <Checkbox
            isChecked={enableStopSeedingIdleDuration}
            onCheck={setEnableStopSeedingIdleDuration}
            label="Stop seeding if idle for (min)" />

          <NumberInput
            className="textbox"
            disabled={!enableStopSeedingIdleDuration}
            value={stopSeedingIdleDuration}
            setValue={setStopSeedingIdleDuration} />
        </Row>
      </Section>
    </Form>
  );
}
