import { HttpContext } from '@adonisjs/core/http'
import supervisorService from '#services/supervisor_service'
import grabBoxService from '#services/grab_box_service'
import { reviewDecisionValidator } from '#validators/shot_validator'

export default class ReviewsController {
  async index() {
    const queue = await supervisorService.getReviewQueue()
    return { data: queue }
  }

  async review({ params, auth, request }: HttpContext) {
    const payload = await request.validateUsing(reviewDecisionValidator)
    const submission = await supervisorService.reviewSubmission(params.submissionId, auth.user!, payload)
    return { data: submission }
  }

  async promote({ params, auth }: HttpContext) {
    const user = await supervisorService.promoteToSenior(params.userId, auth.user!)
    return { data: { message: `User ${user.discordUsername} promoted to senior_contributor`, user } }
  }

  async sweepExpired() {
    const result = await grabBoxService.reclaimExpiredShots()
    return { data: result }
  }
}
