import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import { Exception } from '@adonisjs/core/exceptions'
import Shot from '#models/shot'
import User from '#models/user'
import eventBus from '#services/event_bus'
import discordWebhookService from '#services/discord_webhook_service'

export interface ListShotsFilter {
  sceneNumber?: number
  difficultyTier?: 'easy' | 'medium' | 'hard' | 'complex'
  status?: 'available' | 'claimed' | 'submitted' | 'approved'
}

export class GrabBoxService {
  // calculate deadline based on difficulty tier
  getTierDurationDays(tier: string): number {
    switch (tier) {
      case 'easy':
        return 5
      case 'medium':
        return 7
      case 'hard':
        return 10
      case 'complex':
        return 14
      default:
        return 7
    }
  }

  async listShots(filters: ListShotsFilter = {}, currentUser?: User) {
    const query = Shot.query()
      .preload('claimer', (q) => q.select('id', 'discordUsername', 'discordAvatar', 'role'))
      .preload('submissions', (q) => q.orderBy('version', 'desc'))

    if (filters.sceneNumber) {
      query.where('sceneNumber', filters.sceneNumber)
    }
    if (filters.difficultyTier) {
      query.where('difficultyTier', filters.difficultyTier)
    }
    if (filters.status) {
      query.where('status', filters.status)
    }

    query.orderBy('sceneNumber', 'asc').orderBy('shotCode', 'asc')
    const shots = await query

    const now = DateTime.now()
    const userRole = currentUser?.role || 'voter'
    const isSeniorOrHigher = ['senior_contributor', 'supervisor', 'admin'].includes(userRole)

    // map shots with computed availability flags
    return shots.map((shot) => {
      const isSeniorLocked =
        shot.status === 'available' &&
        shot.seniorPriorityUntil !== null &&
        now < shot.seniorPriorityUntil &&
        ['hard', 'complex'].includes(shot.difficultyTier) &&
        !isSeniorOrHigher

      return {
        ...shot.toJSON(),
        isSeniorLocked,
        tierDays: this.getTierDurationDays(shot.difficultyTier),
      }
    })
  }

  async getShotDetails(shotId: string) {
    return await Shot.query()
      .where('id', shotId)
      .preload('claimer', (q) => q.select('id', 'discordUsername', 'discordAvatar', 'role'))
      .preload('submissions', (q) => {
        q.preload('reviewer', (rq) => rq.select('id', 'discordUsername'))
        q.orderBy('version', 'desc')
      })
      .firstOrFail()
  }

  async claimShot(shotId: string, user: User): Promise<Shot> {
    const now = DateTime.now()

    return await db.transaction(async (trx) => {
      // 1. check if user already has an active claimed or submitted shot (1 shot concurrency limit)
      const activeClaim = await Shot.query({ client: trx })
        .where('claimedBy', user.id)
        .whereIn('status', ['claimed', 'submitted'])
        .first()

      if (activeClaim) {
        throw new Exception(
          `You already have an active shot claimed: ${activeClaim.shotCode}. Complete or release it first.`,
          { status: 409, code: 'ACTIVE_CLAIM_EXISTS' }
        )
      }

      // 2. load shot with row lock and verify available status
      const shot = await Shot.query({ client: trx }).where('id', shotId).forUpdate().firstOrFail()
      if (shot.status !== 'available') {
        throw new Exception(
          `Shot ${shot.shotCode} is currently ${shot.status} and cannot be claimed.`,
          { status: 409, code: 'SHOT_UNAVAILABLE' }
        )
      }

      // 3. check senior priority window on hard/complex shots
      const isSeniorOrAbove = ['senior_contributor', 'supervisor', 'admin'].includes(user.role)
      if (
        shot.seniorPriorityUntil &&
        now < shot.seniorPriorityUntil &&
        ['hard', 'complex'].includes(shot.difficultyTier) &&
        !isSeniorOrAbove
      ) {
        const hoursRemaining = Math.ceil(shot.seniorPriorityUntil.diff(now, 'hours').hours)
        throw new Exception(
          `This ${shot.difficultyTier} shot is reserved for Senior Contributors for another ${hoursRemaining} hours.`,
          { status: 403, code: 'SENIOR_PRIORITY_LOCK' }
        )
      }

      // 4. calculate tier deadline
      const durationDays = this.getTierDurationDays(shot.difficultyTier)
      const deadline = now.plus({ days: durationDays })

      shot.useTransaction(trx)
      shot.status = 'claimed'
      shot.claimedBy = user.id
      shot.claimedAt = now
      shot.deadlineAt = deadline
      await shot.save()

      // 5. emit event and dispatch discord notification
      eventBus.emit('shot:claimed', {
        shotId: shot.id,
        shotCode: shot.shotCode,
        userId: user.id,
      })

      discordWebhookService
        .notifyShotClaimed(
          shot.shotCode,
          shot.difficultyTier,
          user.discordUsername,
          deadline.toFormat('yyyy-MM-dd HH:mm')
        )
        .catch(() => {})

      return shot
    })
  }

  async releaseShot(shotId: string, user: User, reason?: string): Promise<Shot> {
    const shot = await Shot.findOrFail(shotId)

    // verify ownership or supervisor/admin permission
    const isSupervisorOrAbove = ['supervisor', 'admin'].includes(user.role)
    if (shot.claimedBy !== user.id && !isSupervisorOrAbove) {
      throw new Exception('You do not have permission to release this shot claim.', {
        status: 403,
        code: 'FORBIDDEN',
      })
    }

    // reset shot fields back to pool
    shot.status = 'available'
    shot.claimedBy = null
    shot.claimedAt = null
    shot.deadlineAt = null
    await shot.save()

    eventBus.emit('shot:released', {
      shotId: shot.id,
      shotCode: shot.shotCode,
      reason,
    })

    return shot
  }

  async reclaimExpiredShots(): Promise<{ reclaimedCount: number; shotCodes: string[] }> {
    const now = DateTime.now()

    // find all active claims past their deadline
    const expiredShots = await Shot.query()
      .where('status', 'claimed')
      .whereNotNull('deadlineAt')
      .where('deadlineAt', '<', now.toJSDate())
      .preload('claimer')

    const reclaimedCodes: string[] = []

    for (const shot of expiredShots) {
      const claimerName = shot.claimer?.discordUsername || 'Unknown'
      reclaimedCodes.push(shot.shotCode)

      shot.status = 'available'
      shot.claimedBy = null
      shot.claimedAt = null
      shot.deadlineAt = null
      await shot.save()

      eventBus.emit('shot:expired', {
        shotId: shot.id,
        shotCode: shot.shotCode,
      })

      await discordWebhookService.notifyShotExpired(shot.shotCode, claimerName)
    }

    return {
      reclaimedCount: reclaimedCodes.length,
      shotCodes: reclaimedCodes,
    }
  }
}

export const grabBoxService = new GrabBoxService()
export default grabBoxService
