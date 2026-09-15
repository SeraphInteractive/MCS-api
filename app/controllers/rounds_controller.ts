import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import VotingRound from '#models/voting_round'
import FinalizationService from '#services/finalization_service'
import { createRoundValidator, updateRoundValidator } from '#validators/round_validator'

export default class RoundsController {
  async index({ request }: HttpContext) {
    const status = request.input('status')
    const query = VotingRound.query()
    
    if (status) {
      query.where('status', status)
    }
    
    const rounds = await query.exec()
    return { data: rounds }
  }

  async show({ params }: HttpContext) {
    const round = await VotingRound.findOrFail(params.id)
    return { data: round }
  }

  async store({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(createRoundValidator)
    const { opensAt, closesAt, ...rest } = payload
    const round = new VotingRound()
    
    round.merge(rest)
    if (opensAt) round.opensAt = DateTime.fromISO(opensAt)
    if (closesAt) round.closesAt = DateTime.fromISO(closesAt)
    round.createdBy = auth.user!.id
    await round.save()
    
    return { data: round }
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateRoundValidator)
    const { opensAt, closesAt, ...rest } = payload
    const round = await VotingRound.findOrFail(params.id)
    
    round.merge(rest)
    if (opensAt !== undefined) {
      round.opensAt = opensAt ? DateTime.fromISO(opensAt) : null
    }
    if (closesAt !== undefined) {
      round.closesAt = closesAt ? DateTime.fromISO(closesAt) : null
    }
    await round.save()
    
    return { data: round }
  }

  async finalize({ params, auth }: HttpContext) {
    const finalizationService = new FinalizationService()
    // finalization flow requires roundId and maybe auth user id
    const result = await finalizationService.finalize(params.id, auth.user!.id)
    
    return { data: result }
  }

  async destroy({ params }: HttpContext) {
    const round = await VotingRound.findOrFail(params.id)
    await round.delete()
    return { data: { success: true, id: params.id } }
  }
}
