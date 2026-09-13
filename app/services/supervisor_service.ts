import { DateTime } from 'luxon'
import Submission from '#models/submission'
import Shot from '#models/shot'
import User from '#models/user'
import eventBus from '#services/event_bus'
import discordWebhookService from '#services/discord_webhook_service'

export interface SubmitWorkPayload {
  videoUrl: string
  blendUrl?: string | null
  notes?: string | null
}

export interface ReviewDecisionPayload {
  status: 'approved' | 'revision_requested'
  supervisorNotes?: string | null
}

export class SupervisorService {
  async submitWork(shotId: string, user: User, payload: SubmitWorkPayload): Promise<Submission> {
    const shot = await Shot.findOrFail(shotId)

    // verify the submitter owns the active claim
    if (shot.claimedBy !== user.id) {
      throw new Error('You do not own the active claim for this shot.')
    }

    // compute the next version number
    const latestSubmission = await Submission.query()
      .where('shotId', shotId)
      .orderBy('version', 'desc')
      .first()

    const nextVersion = latestSubmission ? latestSubmission.version + 1 : 1

    const submission = await Submission.create({
      shotId: shot.id,
      contributorId: user.id,
      version: nextVersion,
      videoUrl: payload.videoUrl,
      blendUrl: payload.blendUrl || null,
      notes: payload.notes || null,
      status: 'pending_review',
    })

    // update shot status to submitted
    shot.status = 'submitted'
    await shot.save()

    eventBus.emit('submission:created', {
      submissionId: submission.id,
      shotId: shot.id,
      shotCode: shot.shotCode,
      contributorId: user.id,
    })

    await discordWebhookService.notifySubmissionCreated(
      shot.shotCode,
      nextVersion,
      user.discordUsername,
      payload.notes || null
    )

    return submission
  }

  async getReviewQueue() {
    return await Submission.query()
      .where('status', 'pending_review')
      .preload('shot')
      .preload('contributor', (q) => q.select('id', 'discordUsername', 'discordAvatar', 'role'))
      .orderBy('createdAt', 'asc')
  }

  async reviewSubmission(
    submissionId: string,
    supervisor: User,
    payload: ReviewDecisionPayload
  ): Promise<Submission> {
    const submission = await Submission.findOrFail(submissionId)
    const shot = await Shot.findOrFail(submission.shotId)

    const now = DateTime.now()
    submission.status = payload.status
    submission.supervisorNotes = payload.supervisorNotes || null
    submission.reviewedBy = supervisor.id
    submission.reviewedAt = now
    await submission.save()

    if (payload.status === 'approved') {
      shot.status = 'approved'
      await shot.save()
    } else if (payload.status === 'revision_requested') {
      // return shot status to claimed so contributor can continue working
      shot.status = 'claimed'
      await shot.save()
    }

    eventBus.emit('submission:reviewed', {
      submissionId: submission.id,
      shotId: shot.id,
      shotCode: shot.shotCode,
      status: payload.status,
    })

    await discordWebhookService.notifySubmissionReviewed(
      shot.shotCode,
      submission.version,
      payload.status,
      supervisor.discordUsername,
      payload.supervisorNotes || null
    )

    return submission
  }

  async promoteToSenior(targetUserId: string, supervisor: User): Promise<User> {
    const targetUser = await User.findOrFail(targetUserId)

    targetUser.role = 'senior_contributor'
    await targetUser.save()

    eventBus.emit('contributor:promoted', {
      userId: targetUser.id,
      promotedBy: supervisor.id,
    })

    await discordWebhookService.notifyContributorPromoted(
      targetUser.discordUsername,
      supervisor.discordUsername
    )

    return targetUser
  }
}

export const supervisorService = new SupervisorService()
export default supervisorService
