export function setEqual<T>(a: Set<T>, b: Set<T>) {
  if (a.size !== b.size)
    return false;
  for (const o of a)
    if (!b.has(o)) {
      return false;
    }
  return true
}

export function setsEqual<T>(setEntries: T[][]) {
  if (setEntries.length <= 1)
    return true

  let equal = false
  setEntries
    .map(entries => new Set(entries))
    .reduce((prev, next) => {
      if (equal) {
        if (!setEqual(prev, next)) {
          equal = false
        }
      }
      return next
    })
  return equal
}


