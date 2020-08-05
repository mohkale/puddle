import { StatsState } from './state';

const defaultState: StatsState = {
  download: { rate: 0, total: 0, cumulativeTotal: 0, limit: -1, altLimit: -1 },
  upload:   { rate: 0, total: 0, cumulativeTotal: 0, limit: -1, altLimit: -1 },
  altEnabled: false,
  sessionCount: 0,
  totalSecondsActive: 0,
  totalSecondsActiveThisSession: 0,
}

export default defaultState;
