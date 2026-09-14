import { HttpContext } from '@adonisjs/core/http'
import VotingService from '#services/voting_service'
import { createBallotValidator } from '#validators/ballot_validator'

export default class BallotsController {
  async store({ params, request, auth }: HttpContext) {
    const payload = await request.validateUsing(createBallotValidator)
    const votingService = new VotingService()
    
    // assuming submitBallot takes roundId, userId, payload
    const ballot = await votingService.submitBallot(params.roundId, auth.user!.id, payload)
    
    return { data: ballot }
  }

  async index({ params }: HttpContext) {
    const votingService = new VotingService()
    const ballots = await votingService.getBallots(params.roundId)
    return ballots
  }

  async show({ params, auth }: HttpContext) {
    const votingService = new VotingService()
    const ballot = await votingService.getMyBallot(params.roundId, auth.user!.id)
    
    return { data: ballot }
  }
}
