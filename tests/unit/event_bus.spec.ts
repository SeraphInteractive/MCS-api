// test event bus emissions and round channel subscriptions
import { test } from '@japa/runner'
import { EventBus } from '#services/event_bus'

test.group('EventBus', () => {
  test('emits generic and round specific events', async ({ assert }) => {
    const bus = new EventBus()
    const received: any[] = []
    const roundSpecific: any[] = []

    bus.on('raid:alert', (payload) => {
      received.push(payload)
    })

    bus.on('raid:alert:round-123', (payload) => {
      roundSpecific.push(payload)
    })

    bus.emit('raid:alert', {
      entryId: 'entry-1',
      roundId: 'round-123',
      severity: 'CRITICAL_RAID',
      compositeScore: 0.95,
    })

    assert.lengthOf(received, 1)
    assert.equal(received[0].severity, 'CRITICAL_RAID')
    assert.lengthOf(roundSpecific, 1)
    assert.equal(roundSpecific[0].entryId, 'entry-1')
  })

  test('allows unsubscribing listeners with off', async ({ assert }) => {
    const bus = new EventBus()
    let count = 0

    const listener = () => {
      count++
    }

    bus.on('test:event', listener)
    bus.emit('test:event', {})
    assert.equal(count, 1)

    bus.off('test:event', listener)
    bus.emit('test:event', {})
    assert.equal(count, 1)
  })
})
