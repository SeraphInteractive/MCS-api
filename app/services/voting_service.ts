import { validate_ballot, type Ballot as LogicBallot } from '@vote-internals/logic'
import VotingRound from '#models/voting_round'
import Entry from '#models/entry'
import BallotModel from '#models/ballot'
import RoundNotOpenException from '#exceptions/round_not_open_exception'
import BallotValidationException from '#exceptions/ballot_validation_exception'
import { RaidService } from './raid_service.js'
import { eventBus } from './event_bus.js'

export class VotingService {
  private raidService = new RaidService()

  async submitBallot(
    roundId: string,
    userId: string,
    rank1OrPayload: string | { rank1_entry_id: string; rank2_entry_id: string; rank3_entry_id: string },
    rank2EntryId?: string,
    rank3EntryId?: string
  ): Promise<BallotModel> {
    const rank1 = typeof rank1OrPayload === 'string' ? rank1OrPayload : rank1OrPayload.rank1_entry_id
    const rank2 = typeof rank1OrPayload === 'string' ? rank2EntryId! : rank1OrPayload.rank2_entry_id
    const rank3 = typeof rank1OrPayload === 'string' ? rank3EntryId! : rank1OrPayload.rank3_entry_id

    // make sure the round is actually open right now
    const round = await VotingRound.findOrFail(roundId)
    if (round.status !== 'open') {
      throw new RoundNotOpenException(roundId, round.status)
    }

    // get all valid entry ids to check against
    const entries = await Entry.query().where('roundId', roundId)
    const validEntrySet = new Set(entries.map((e) => e.id))

    const logicBallot: LogicBallot = {
      voterId: userId,
      rank1,
      rank2,
      rank3,
    }

    // run logic validations on the ballot
    const validation = validate_ballot(logicBallot, validEntrySet)
    if (!validation.isValid) {
      throw new BallotValidationException([...validation.errors])
    }

    // save the ballot to db and overwrite if they already voted
    const ballot = await BallotModel.updateOrCreate(
      { roundId, voterId: userId },
      {
        rank1EntryId: rank1,
        rank2EntryId: rank2,
        rank3EntryId: rank3,
      }
    )

    // run raid analysis in the background
    this.raidService.analyzeAffectedEntries(roundId, [rank1, rank2, rank3]).catch(console.error)

    // let the rest of the app know
    eventBus.emit('ballot:submitted', {
      roundId,
      voterId: userId,
      entryIds: [rank1, rank2, rank3],
    })

    return ballot
  }

  async getMyBallot(roundId: string, userId: string): Promise<BallotModel | null> {
    // fetch single ballot for this user
    return await BallotModel.query()
      .where('roundId', roundId)
      .where('voterId', userId)
      .first()
  }
}

export default VotingService
