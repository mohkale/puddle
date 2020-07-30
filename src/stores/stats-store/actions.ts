import { createAction } from '@reduxjs/toolkit';
import {
  TransmissionSession as Session,
  TransmissionSessionStats as SessionStats
} from '@puddle/transmission';

export const statsUpdated = createAction<SessionStats>('stats/update-stats')

export const limitsUpdated = createAction<Session>('stats/update-limits')

export const altSpeedToggled = createAction<{ value: boolean }>('stats/alt-speed-toggled')
