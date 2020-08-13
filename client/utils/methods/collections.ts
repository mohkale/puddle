/**
 * Return the set of all elements in `a` that are not
 * in `b`.
 */
export function setDifference<T>(a: T[], b: Set<T>): T[] {
  return a.filter(x => !b.has(x))
}

export function setUnionExcludingIntersection<T>(a: T[], b: T[]) {
  const aSet = new Set(a), bSet = new Set(b)
  return [...a, ...b].filter(o => {
    return !(aSet.has(o) && bSet.has(o))
  })
}

/**
 * Find the set partition of two collections of the same type.
 *
 * A set partition is the list of elements that have been removed
 * from the first collection and the list of elements added to the
 * first collection.
 *
 * @returns [removed, added] a tuple of the change in state.
 */
export function setPartition<T>(a: T[], b: T[]) {
  const aSet = new Set(a), bSet = new Set(b)
  return [a.filter(x => !bSet.has(x)),
          b.filter(y => !aSet.has(y))]
}

export function arrayRemove<T>(arr: T[], elem: T, errorHandler?: VoidFunction) {
  const index = arr.indexOf(elem)
  if (index === -1) {
    errorHandler && errorHandler!()
  } else {
    arr.splice(index, 1)
  }
}
