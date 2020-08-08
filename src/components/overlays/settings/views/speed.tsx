import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { padString } from '@puddle/utils';
import { syncSession } from '@puddle/stores';

import { Form, Section, Row } from '../controls';
import { sessionSelector, useStateFromSelector  } from '../utils';
import {
  Checkbox, ClientContext, Select, NumberInput, MessageType,
  MessageLevel
} from '@puddle/components';

import {
  TransmissionScheduleDays as ScheduleDays
} from '@puddle/transmission';

function minutesAfterMidnightToOption(minutes: number) {
  const minute = minutes % 60
  const hour = Math.floor(minutes / 60)
  return { value: minutes, label: `${padString(minute.toString(), 2)}:${padString(hour.toString(), 2)}` }
}

const TIME_OPTIONS = Array(24 * 4).fill(0).map((_, i) =>
  minutesAfterMidnightToOption(i * 15))

// We're storing it like this before converting because this
// approach gives exhaustive type completion for values in
// ScheduleDays. There's no way to get that with a type like
// { key: ScheduleDays, label: string } which is what we actually
// want.
const SCHEDULE_DAY_OPTION_ENTRIES: { [key in ScheduleDays]: string } = {
  [ScheduleDays.ALL]:       'All',
  [ScheduleDays.MONDAY]:    'Monday',
  [ScheduleDays.TUESDAY]:   'Tuesday',
  [ScheduleDays.WEDNESDAY]: 'Wednesday',
  [ScheduleDays.THURSDAY]:  'Thursday',
  [ScheduleDays.FRIDAY]:    'Friday',
  [ScheduleDays.SATURDAY]:  'Saturday',
  [ScheduleDays.SUNDAY]:    'Sunday',
  [ScheduleDays.WEEKDAY]:   'Weekdays',
  [ScheduleDays.WEEKEND]:   'Weekends',
}

const SCHEDULE_DAY_OPTIONS = Object.entries(SCHEDULE_DAY_OPTION_ENTRIES)
  .map(([value, label]) => ({ value: Number(value), label }))

export function SpeedView() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const [messages, setMessages] = useState<MessageType[]>([])

  const [uploadLimit, setUploadLimit] = useStateFromSelector(sessionSelector(s => s['speed-limit-up']))
  const [downloadLimit, setDownloadLimit] = useStateFromSelector(sessionSelector(s => s['speed-limit-down']))
  const [allowUploadLimit, setAllowUploadLimit] = useStateFromSelector(sessionSelector(s => s['speed-limit-up-enabled']))
  const [allowDownloadLimit, setAllowDownloadLimit] = useStateFromSelector(sessionSelector(s => s['speed-limit-down-enabled']))
  const [altUploadLimit, setAltUploadLimit] = useStateFromSelector(sessionSelector(s => s['alt-speed-up']))
  const [altDownloadLimit, setAltDownloadLimit] = useStateFromSelector(sessionSelector(s => s['alt-speed-down']))
  const [useScheduledTimes, setUseScheduledTimes] = useStateFromSelector(sessionSelector(s => s['alt-speed-time-enabled']))
  const [altSpeedDays, setAltSpeedDays] =  useStateFromSelector(sessionSelector(s => s['alt-speed-time-day']))
  const [altSpeedTimeBegin, setAltSpeedTimeBegin] =  useStateFromSelector(sessionSelector(s => s['alt-speed-time-begin']))
  const [altSpeedTimeEnd, setAltSpeedTimeEnd] =  useStateFromSelector(sessionSelector(s => s['alt-speed-time-end']))

  const selectedAltSpeedDaysOption = SCHEDULE_DAY_OPTIONS.find(o => o.value === altSpeedDays)

  const onSubmit = () => {
    const newMessages: MessageType[] = []
    let failed = false
    if (isNaN(uploadLimit)) {
      newMessages.push({ level: MessageLevel.ERROR, label: 'upload limit must be a number' })
      failed = true
    }

    if (isNaN(downloadLimit)) {
      newMessages.push({ level: MessageLevel.ERROR, label: 'download limit must be a number' })
      failed = true
    }

    if (isNaN(altDownloadLimit)) {
      newMessages.push({ level: MessageLevel.ERROR, label: 'alternative download limit must be a number' })
      failed = true
    }

    if (isNaN(altUploadLimit)) {
      newMessages.push({ level: MessageLevel.ERROR, label: 'alternative upload limit must be a number' })
      failed = true
    }

    setMessages(newMessages)
    if (failed) return false

    // TODO handle error
    return transmission.setSession({
      'speed-limit-up': uploadLimit,
      'speed-limit-down': downloadLimit,
      'speed-limit-up-enabled': allowUploadLimit,
      'speed-limit-down-enabled': allowDownloadLimit,
      'alt-speed-up': altUploadLimit,
      'alt-speed-down': altDownloadLimit,
      'alt-speed-time-enabled': useScheduledTimes,
      'alt-speed-time-day': altSpeedDays,
      'alt-speed-time-begin': altSpeedTimeBegin,
      'alt-speed-time-end': altSpeedTimeEnd,
    }).then(() => setMessages([{ level: MessageLevel.INFO, label: 'succesfully synced settings' }]))
      .then(() => dispatch(syncSession(transmission)))
  }

  return (
    <Form onSubmit={onSubmit} messages={messages}>
      <Section title="Speed Limits">
        <Row>
          <Checkbox
            isChecked={allowUploadLimit}
            onCheck={setAllowUploadLimit}
            label="Upload (kB/s)" />

          <NumberInput disabled={!allowUploadLimit} value={uploadLimit} setValue={setUploadLimit} />
        </Row>

        <Row>
          <Checkbox
            isChecked={allowDownloadLimit}
            onCheck={setAllowDownloadLimit}
            label="Download (kB/s)" />

          <NumberInput disabled={!allowDownloadLimit} value={downloadLimit} setValue={setDownloadLimit} />
        </Row>
      </Section>

      <Section title="Alternative Speed Limits">
        <Row>
          <label>Upload (kB/s)</label>
          <NumberInput value={altUploadLimit} setValue={setAltUploadLimit} />
        </Row>

        <Row>
          <label>Download (kB/s)</label>
          <NumberInput value={altDownloadLimit} setValue={setAltDownloadLimit} />
        </Row>
      </Section>

      <Section title="Alternative Speed Schedule">
        <Row>
          <Checkbox
            isChecked={useScheduledTimes}
            onCheck={setUseScheduledTimes}
            label="Enabled" />
        </Row>

        <Row>
          <label>From</label>
          <Select
            isDisabled={!useScheduledTimes}
            options={TIME_OPTIONS}
            value={minutesAfterMidnightToOption(altSpeedTimeBegin)}
            onChange={p => setAltSpeedTimeBegin(p.value)} />
        </Row>

        <Row>
          <label>To</label>
          <Select
            isDisabled={!useScheduledTimes}
            options={TIME_OPTIONS}
            value={minutesAfterMidnightToOption(altSpeedTimeEnd)}
            onChange={p => setAltSpeedTimeEnd(p.value)} />
        </Row>

        <Row>
          <label>On days</label>
          <Select
            isDisabled={!useScheduledTimes}
            options={SCHEDULE_DAY_OPTIONS}
            value={selectedAltSpeedDaysOption}
            onChange={p => setAltSpeedDays(p.value)} />
        </Row>
      </Section>
    </Form>
  )
}
