import { cyclePriority, ExtendedPriorityType } from '../index';
import { TransmissionPriorityType as PriorityType } from '@transmission';

const cycleOrder: PriorityType[] = [
  PriorityType.NORM,
  PriorityType.HIGH,
  PriorityType.LOW,
]

test('cycling priority goes in correct order', () => {
  cycleOrder.reduce((current, next) => {
    expect(cyclePriority(current, false)).toBe(next);
    return next
  })
})

test('cycling priority wraps around', () => {
  const last = cycleOrder[cycleOrder.length-1]
  const first = cycleOrder[0]
  expect(cyclePriority(last, false)).toBe(first)
})

const cycleOrderWithNoDownload: ExtendedPriorityType[] = [
  PriorityType.NORM,
  PriorityType.HIGH,
  'dont-download',
  PriorityType.LOW,
]

test('cycling priority with dont-download goes in correct order', () => {
  cycleOrderWithNoDownload.reduce((current, next) => {
    expect(cyclePriority(current, true)).toBe(next);
    return next
  })
})

test('cycling priority with dont-download wraps around', () => {
  const last = cycleOrderWithNoDownload[cycleOrderWithNoDownload.length-1]
  const first = cycleOrderWithNoDownload[0]
  expect(cyclePriority(last, true)).toBe(first)
})
