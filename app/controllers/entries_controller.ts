import { HttpContext } from '@adonisjs/core/http'
import Entry from '#models/entry'
import VotingRound from '#models/voting_round'
import { createEntryValidator, updateEntryValidator } from '#validators/entry_validator'

export default class EntriesController {
  async index({ params }: HttpContext) {
    const entries = await Entry.query().where('roundId', params.roundId)
    return { data: entries }
  }

  async store({ params, request }: HttpContext) {
    await VotingRound.findOrFail(params.roundId)
    const payload = await request.validateUsing(createEntryValidator)
    const entry = new Entry()
    
    entry.merge(payload)
    entry.roundId = params.roundId
    await entry.save()
    
    return { data: entry }
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateEntryValidator)
    const entry = await Entry.query().where('id', params.id).where('roundId', params.roundId).firstOrFail()
    
    entry.merge(payload)
    await entry.save()
    
    return { data: entry }
  }

  async destroy({ params }: HttpContext) {
    const entry = await Entry.query().where('id', params.id).where('roundId', params.roundId).firstOrFail()
    await entry.delete()
    
    return { data: { message: 'entry deleted' } }
  }

  async reinstate({ params }: HttpContext) {
    const entry = await Entry.query().where('id', params.id).where('roundId', params.roundId).firstOrFail()
    entry.isQuarantined = false
    await entry.save()
    
    return { data: entry }
  }
}
