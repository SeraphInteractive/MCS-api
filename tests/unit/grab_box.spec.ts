// test grab box logic, deadlines, storage urls, and event emissions
import { test } from '@japa/runner'
import { GrabBoxService } from '#services/grab_box_service'
import { StorageService } from '#services/storage_service'
import { EventBus } from '#services/event_bus'

test.group('GrabBox & Pipeline Engine', () => {
  test('calculates correct deadline duration by difficulty tier', async ({ assert }) => {
    const service = new GrabBoxService()

    assert.equal(service.getTierDurationDays('easy'), 5)
    assert.equal(service.getTierDurationDays('medium'), 7)
    assert.equal(service.getTierDurationDays('hard'), 10)
    assert.equal(service.getTierDurationDays('complex'), 14)
    assert.equal(service.getTierDurationDays('unknown'), 7)
  })

  test('storage service handles development fallback urls cleanly', async ({ assert }) => {
    const storage = new StorageService()

    const result = await storage.getPresignedUploadUrl('shot-uuid-1', 1, 'my test animation.mp4', 'video/mp4')

    assert.include(result.fileKey, 'shots/shot-uuid-1/v1/')
    assert.include(result.fileKey, 'my_test_animation.mp4')
    assert.isString(result.uploadUrl)
    assert.isString(result.directUrl)
  })

  test('event bus broadcasts shot and submission events properly', async ({ assert }) => {
    const bus = new EventBus()
    const events: any[] = []

    bus.on('shot:claimed', (data) => events.push({ type: 'claimed', data }))
    bus.on('submission:created', (data) => events.push({ type: 'submission', data }))
    bus.on('contributor:promoted', (data) => events.push({ type: 'promoted', data }))

    bus.emit('shot:claimed', { shotId: 'shot-1', shotCode: 'SC01_SH010', userId: 'user-1' })
    bus.emit('submission:created', {
      submissionId: 'sub-1',
      shotId: 'shot-1',
      shotCode: 'SC01_SH010',
      contributorId: 'user-1',
    })
    bus.emit('contributor:promoted', { userId: 'user-1', promotedBy: 'supervisor-1' })

    assert.lengthOf(events, 3)
    assert.equal(events[0].data.shotCode, 'SC01_SH010')
    assert.equal(events[1].data.submissionId, 'sub-1')
    assert.equal(events[2].data.userId, 'user-1')
  })

  test('validates tier duration boundaries', async ({ assert }) => {
    const service = new GrabBoxService()
    assert.equal(service.getTierDurationDays('easy'), 5)
    assert.equal(service.getTierDurationDays('medium'), 7)
    assert.equal(service.getTierDurationDays('hard'), 10)
    assert.equal(service.getTierDurationDays('complex'), 14)
  })
})
