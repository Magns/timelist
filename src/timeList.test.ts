import { TimeList } from '.'
import { assert, expect } from 'chai'

describe('Insertion works correctly', () => {
  it('should be able to insert items', () => {
    const tl = new TimeList<string>()
    tl.insert(new Date(), 'This is a test')
    expect(tl.list[0].value).to.equal('This is a test')
  })

  it('is able to insert more than one value at once', () => {
    const tl = new TimeList<number>()
    tl.insert('2021-01-01T00:00:00.000Z', 10, 20, 30)

    expect(tl.list[0].value).to.equal(10)
    expect(tl.list[1].value).to.equal(20)
    expect(tl.list[2].value).to.equal(30)
  })

  it('inserts new elements in order', () => {
    const tl = new TimeList<string>()

    // Inserted out of order
    tl.insert('2021-09-07T00:00:00.000Z', 'C')
    tl.insert('2021-09-06T00:00:00.000Z', 'A')
    tl.insert(new Date('2021-09-06T00:00:00.000Z'), 'B')
    tl.insert(new Date('2021-09-08T00:00:00.000Z'), 'D')

    // Should come out correct anyway
    expect(tl.list[0].value).to.equal('A')
    expect(tl.list[1].value).to.equal('B')
    expect(tl.list[2].value).to.equal('C')
    expect(tl.list[3].value).to.equal('D')
  })

  it('correctly inserts at start of list', () => {
    const tl = new TimeList<string>([
      { date: '2021-10-02T10:00:00.000Z', value: 'A' },
      { date: '2021-10-02T10:00:00.000Z', value: 'B' },
      { date: '2021-10-03T10:00:00.000Z', value: 'C' },
      { date: '2021-10-03T10:00:00.000Z', value: 'D' },
    ])
    tl.insert('2000-10-01T10:00:00.000Z', 'START')

    expect(tl.list[0].value).to.equal('START')
  })

  it('correctly inserts at end of list', () => {
    const tl = new TimeList<string>([
      { date: '2021-10-02T10:00:00.000Z', value: 'A' },
      { date: '2021-10-02T10:00:00.000Z', value: 'B' },
      { date: '2021-10-03T10:00:00.000Z', value: 'C' },
      { date: '2021-10-03T10:00:00.000Z', value: 'D' },
    ])
    tl.insert('2021-10-04T10:00:00.000Z', 'END')

    expect(tl.list[tl.list.length - 1].value).to.equal('END')
  })
})

describe('Reading works correctly', () => {
  it('can find entries on a certain day', () => {
    const tl = new TimeList()
    tl.insert(new Date('2021-10-01'), 'X')
    tl.insert(new Date('2021-10-01'), 'X')
    tl.insert(new Date('2021-10-02'), 'A')
    tl.insert(new Date('October 2, 2021 10:00:00'), 'B')
    tl.insert(new Date('October 2, 2021 14:00:00'), 'C')
    tl.insert('2021-10-02T23:59:59.999Z', 'D')
    tl.insert(new Date('2021-10-03'), 'Z')

    const result = tl.find('2021-10-02', 'day')

    expect(result[0].value).to.equal('A')
    expect(result[1].value).to.equal('B')
    expect(result[2].value).to.equal('C')
    expect(result[3].value).to.equal('D')

    const lastEntry = tl.find(new Date('2021-10-03'))
    expect(lastEntry[0].value).to.equal('Z')
  })

  it('can find entries in a range', () => {
    const tl = new TimeList<any>()
    tl.insert('2021-10-01T10:00:00.000Z', 0)
    tl.insert('2021-10-02T10:00:00.000Z', 'A', 'B')
    tl.insert('2021-10-03T10:00:00.000Z', 'C', 'D')
    tl.insert('2021-10-04T10:00:00.000Z', 0)

    const results = tl.findBetween(
      '2021-10-02T05:00:00.000Z',
      '2021-10-03T10:00:00.000Z'
    )

    assert.deepEqual(results, [
      { date: '2021-10-02T10:00:00.000Z', value: 'A' },
      { date: '2021-10-02T10:00:00.000Z', value: 'B' },
      { date: '2021-10-03T10:00:00.000Z', value: 'C' },
      { date: '2021-10-03T10:00:00.000Z', value: 'D' },
    ])
  })
})
