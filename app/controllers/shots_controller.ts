import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Shot from '#models/shot'
import Submission from '#models/submission'
import grabBoxService from '#services/grab_box_service'
import supervisorService from '#services/supervisor_service'
import storageService from '#services/storage_service'
import {
  createShotValidator,
  updateShotValidator,
  getUploadUrlValidator,
  submitWorkValidator,
} from '#validators/shot_validator'

export default class ShotsController {
  async index({ request, auth }: HttpContext) {
    const filters = {
      sceneNumber: request.input('sceneNumber') ? Number(request.input('sceneNumber')) : undefined,
      difficultyTier: request.input('difficultyTier'),
      status: request.input('status'),
    }

    const shots = await grabBoxService.listShots(filters, auth.user)
    return { data: shots }
  }

  async show({ params }: HttpContext) {
    const shot = await grabBoxService.getShotDetails(params.id)
    return { data: shot }
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createShotValidator)

    let seniorPriorityUntil: DateTime | null = null
    if (payload.seniorPriorityHours && payload.seniorPriorityHours > 0) {
      seniorPriorityUntil = DateTime.now().plus({ hours: payload.seniorPriorityHours })
    }

    const shot = await Shot.create({
      roundId: payload.roundId || null,
      sceneNumber: payload.sceneNumber,
      shotCode: payload.shotCode,
      title: payload.title,
      description: payload.description || null,
      difficultyTier: payload.difficultyTier,
      seniorPriorityUntil,
      status: 'available',
    })

    return { data: shot }
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateShotValidator)
    const shot = await Shot.findOrFail(params.id)

    shot.merge(payload)
    await shot.save()

    return { data: shot }
  }

  async destroy({ params }: HttpContext) {
    const shot = await Shot.findOrFail(params.id)
    await shot.delete()

    return { data: { message: 'Shot deleted successfully' } }
  }

  async claim({ params, auth }: HttpContext) {
    const shot = await grabBoxService.claimShot(params.id, auth.user!)
    return { data: shot }
  }

  async release({ params, auth, request }: HttpContext) {
    const reason = request.input('reason')
    const shot = await grabBoxService.releaseShot(params.id, auth.user!, reason)
    return { data: shot }
  }

  async uploadUrl({ params, auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(getUploadUrlValidator)
    const shot = await Shot.findOrFail(params.id)

    // verify ownership
    if (shot.claimedBy !== auth.user!.id) {
      return response.forbidden({ error: { code: 'FORBIDDEN', message: 'You do not own the active claim for this shot.' } })
    }

    // get latest version to determine next version folder
    const latest = await Submission.query().where('shotId', shot.id).orderBy('version', 'desc').first()
    const nextVersion = latest ? latest.version + 1 : 1

    const result = await storageService.getPresignedUploadUrl(
      shot.id,
      nextVersion,
      payload.filename,
      payload.contentType || undefined
    )

    return { data: result }
  }

  async submit({ params, auth, request }: HttpContext) {
    const payload = await request.validateUsing(submitWorkValidator)
    const submission = await supervisorService.submitWork(params.id, auth.user!, payload)
    return { data: submission }
  }
}
