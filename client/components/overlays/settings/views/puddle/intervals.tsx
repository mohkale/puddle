import React from 'react';

import { NumberInput } from '@client/components';
import { SettingsState, COLUMN_MINIMUM_WIDTH } from '@client/stores'

import { Section, Row } from '../../controls';
import { ESSENTIAL_FIELDS } from '@client/models';

interface IntervalsSectionProps {
  intervals: SettingsState['intervals']
  setIntervals: (val: SettingsState['intervals']) => void
}

export function IntervalsSection({ intervals, setIntervals }: IntervalsSectionProps) {
  return (
    <Section title="Intervals">
      <Row>
        <label>Torrent Sync (ms)</label>
        <NumberInput
          className="textbox" value={intervals.torrentsSync}
          setValue={val => setIntervals({ ...intervals, torrentsSync: val })} />
      </Row>

      <Row>
        <label>Stats Sync (ms)</label>
        <NumberInput
          className="textbox" value={intervals.speedSync}
          setValue={val => setIntervals({ ...intervals, speedSync: val })} />
      </Row>

      <Row>
        <label>Session Sync (ms)</label>
        <NumberInput
          className="textbox" value={intervals.speedLimitsSync}
          setValue={val => setIntervals({ ...intervals, speedLimitsSync: val })} />
      </Row>
    </Section>
  )
}


