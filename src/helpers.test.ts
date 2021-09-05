import { expect } from 'chai'
import { indexesInRange } from './helpers'

describe('Looking up dates within a range works', () => {
  it('finds the correct elements in a range', () => {
    const dates = [
      { date: '2021-09-01T20:00:00.000Z', value: 'A' },
      { date: '2021-09-02T20:00:00.000Z', value: 'B' },
      { date: '2021-09-03T20:00:00.000Z', value: 'C' },
      { date: '2021-09-04T20:00:00.000Z', value: 'D' },
      { date: '2021-09-05T20:00:00.000Z', value: 'E' },
      { date: '2021-09-06T20:00:00.000Z', value: 'F' },
      { date: '2021-09-07T20:00:00.000Z', value: 'G' },
      { date: '2021-09-08T20:00:00.000Z', value: 'H' },
    ]

    let r = indexesInRange(
      dates,
      '2021-09-03T10:00:00.000Z',
      '2021-09-07T10:00:00.000Z'
    )
    expect(dates[r.from].value).to.equal('C')
    expect(dates[r.to].value).to.equal('F')
  })
})
