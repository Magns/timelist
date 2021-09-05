import { TimeObject } from './types'
import { parseDateInput, findInsertIndex, indexesInRange } from './helpers'

export class TimeList<T> {
  list: Array<TimeObject<T>> = []

  constructor(list?: Array<TimeObject<T>>) {
    if (list) {
      this.list = list
    }
  }

  /**
   * Insert values to the list on specified date
   *
   * @param date JS date or ISO 8601 string
   * @param values
   */
  insert(date: Date | string, ...values: Array<T>) {
    let isoString = parseDateInput(date)
    const index = findInsertIndex(this.list, isoString)
    const objs = values.map((value) => ({ date: isoString, value }))
    this.list.splice(index, 0, ...objs)
  }

  /**
   * Find entries on certain date/time. Not fully implemented.
   *
   * @param date Datetime to look up
   * @param accuracy
   * @returns
   */
  find(date: Date | string, accuracy?: 'day') {
    const isoString = parseDateInput(date)
    if (accuracy === 'day') {
      const day = isoString.slice(0, 11)
      const from = day + 'T00:00:00.000Z'
      const to = day + 'T23:59:59.999Z'

      const result = indexesInRange(this.list, from, to)

      if (result === null) {
        return []
      } else {
        return this.list.slice(result.from, result.to + 1)
      }
    }

    const exactMatches = indexesInRange(this.list, isoString, isoString)
    return exactMatches === null
      ? []
      : this.list.slice(exactMatches.from, exactMatches.to + 1)
  }

  /**
   * Find items between from date and to date (inclusive)
   *
   * @param from
   * @param to
   * @returns array of items between from and to
   */
  findBetween(from: Date | string, to: Date | string): Array<TimeObject<T>> {
    const fromIso = parseDateInput(from)
    const toIso = parseDateInput(to)

    const result = indexesInRange(this.list, fromIso, toIso)

    if (result === null) {
      return []
    } else {
      return this.list.slice(result.from, result.to + 1)
    }
  }
}
