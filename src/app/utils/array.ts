/**
 * Randomly choose an item from an array.
 * @param arr The input array
 * @returns A random item from the array
 * @throws Will throw if the array is empty
 *
 * @example
 * choose([1, 2, 3]) // 1 or 2 or 3
 * choose([]) // Error: Cannot choose from empty array
 */
export function choose<T>(arr: ReadonlyArray<T>): T {
  if (arr.length === 0) {
    throw new Error("Cannot choose from empty array")
  }
  return arr[Math.floor(Math.random() * arr.length)]!
}

// Given an array of items, and a function that gets some property from each item,
// return an array that holds only unique elements. Note that this preserves order.
export function uniqueBy<T, K>(array: T[], getKey: (item: T) => K): T[] {
  return [...new Map(array.map((a) => [getKey(a), a])).values()]
}
