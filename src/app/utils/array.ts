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
