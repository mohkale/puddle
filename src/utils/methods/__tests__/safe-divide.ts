import { safeDivide } from '../safe-divide';

test('safe-divide by 0 is 0', () => {
  expect(safeDivide(100, 0)).toBe(0)
})

test('safe-divide actually divides', () => {
  expect(safeDivide(10, 5)).toBe(10 / 5)
})
