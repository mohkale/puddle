import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  NumberInput, MessageType, MessageLevel
} from '@puddle/components';
import { intervalsUpdated, selectIntervals } from '@puddle/stores'

import { Form, Section, Row } from '../controls';

export function PuddleView() {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState<MessageType[]>([])

  const intervals = useSelector(selectIntervals)
  const [torrentSyncInterval, setTorrentSyncInterval] = useState(intervals.torrentsSync)
  const [speedSyncInterval, setSpeedSyncInterval] = useState(intervals.speedSync)
  const [speedLimitsSyncInterval, setSpeedLimitsSyncInterval] = useState(intervals.speedLimitsSync)

  const onSubmit = () => {
    const newMessages: MessageType[] = []
    let failed = false;
    [{ value: torrentSyncInterval, key: 'torrents-sync' },
     { value: speedSyncInterval, key: 'stats-sync' },
     { value: speedLimitsSyncInterval, key: 'session-sync' }]
      .forEach(({ value, key }) => {
        if (isNaN(value) || value < 0) {
          failed = true
          newMessages.push({
            level: MessageLevel.ERROR,
            label: `${key} must be a valid number greater than 0`
          })
        }
      })

    setMessages(newMessages)
    if (failed) return

    dispatch(intervalsUpdated({
      torrentsSync: torrentSyncInterval,
      speedSync: speedSyncInterval,
      speedLimitsSync: speedLimitsSyncInterval,
    }))

    setMessages([{ level: MessageLevel.INFO, label: 'succesfully saved changes' }])
  }

  return (
    <Form onSubmit={onSubmit} messages={messages}>
      <Section title="Intervals">
        <Row>
          <label>Torrent Sync (ms)</label>
          <NumberInput
            value={torrentSyncInterval}
            setValue={setTorrentSyncInterval} />
        </Row>

        <Row>
          <label>Stats Sync (ms)</label>
          <NumberInput
            value={speedSyncInterval}
            setValue={setSpeedSyncInterval} />
        </Row>

        <Row>
          <label>Session Sync (ms)</label>
          <NumberInput
            value={speedLimitsSyncInterval}
            setValue={setSpeedLimitsSyncInterval} />
        </Row>
      </Section>
    </Form>
  )
}
