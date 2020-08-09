import { setEqual, setsEqual } from '../set-equal';

const setA1 = new Set([1,2,3])
const setA2 = new Set([1,2,3])
const setB1 = new Set([4,5,6])

test('equal sets are equal', () => {
  expect(setEqual(setA1, setA2)).toBeTruthy()
})

test('different sets are not equal', () => {
  expect(setEqual(setA1, setB1)).toBeFalsy()
})

test("empty set doesn't equal populated set", () => {
  expect(setEqual(setA1, new Set())).toBeFalsy()
})

test('collection of same sets are equal', () => {
  const sets = ['a', 'b', 'c']
  expect(setsEqual([sets, sets, sets])).toBeTruthy()
})

test('collection of different sets are not equal', () => {
  const sets = [['a', 'b', 'c',], ['d', 'e', 'f']]
  expect(setsEqual(sets)).toBeFalsy()
})
