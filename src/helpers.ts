import { TimeObject } from './types'

/**
 * Takes a JS date or ISO string, and normalizes to an ISO string
 *
 * @param date
 * @returns
 */
export function parseDateInput(date: Date | string): string {
  let isoString

  if (date instanceof Date) {
    isoString = date.toISOString()
  } else if (typeof date === 'string') {
    isoString = date
  } else {
    throw new Error('invalid date format')
  }

  return isoString
}

/**
 * Find index for insertion in array sorted by date.
 *
 * @param array
 * @param date ISO string
 * @returns Index for insertion
 */
export function findInsertIndex(
  array: Array<TimeObject<any>>,
  date: string
): number {
  if (array.length === 0) {
    return 0
  }

  let low = 0
  let high = array.length - 1

  while (low <= high) {
    const mid = Math.floor((high + low) / 2)

    if (date >= array[mid].date) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return low
}

/**
 * Find array indexes between dates (inclusive)
 *
 * @param array Array to search
 * @param from From date ISO string
 * @param to To date ISO string
 * @returns start and end index for entries in time range. Null if none found.
 */
export function indexesInRange(
  array: Array<TimeObject<any>>,
  from: string,
  to: string
): { from: number; to: number } | null {
  if (array.length === 0) {
    return null
  }

  let low = 0
  let high = array.length - 1

  // Do a binary search looking for any date within the range
  while (low <= high) {
    const mid = Math.floor((high + low) / 2)

    if (array[mid].date < from) {
      low = mid + 1
    } else if (array[mid].date > to) {
      high = mid - 1
    } else {
      // Found a match; iterating up and down to find start and end of range
      let first = mid
      let last = mid

      while (first > 0 && array[first - 1].date >= from) {
        first--
      }

      while (last < array.length - 1 && array[last + 1].date <= to) {
        last++
      }

      return { from: first, to: last }
    }
  }

  return null
}
