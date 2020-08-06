import { padString } from '../pad-string';

test('padding a string fills out to the correct length', () => {
  expect(padString('foo', 10).length).toBe(10)
})

test('padding a string contains the original string', () => {
  const message = 'foobar'
  expect(padString(message, 10)).toContain(message)
})

test("padding a string that's long enough doesn't modify it", () => {
  const message = 'foo'
  expect(padString(message, 3)).toEqual(message)
})
