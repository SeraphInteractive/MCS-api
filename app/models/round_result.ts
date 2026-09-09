import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import VotingRound from '#models/voting_round'
import User from '#models/user'

export default class RoundResult extends BaseModel {
  static table = 'round_results'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare roundId: string

  @column()
  declare totalBallots: number

  @column()
  declare totalPoints: number

  @column()
  declare isConserved: boolean

  // handle json data
  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value)
  })
  declare leaderboard: any

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value)
  })
  declare separationResults: any

  @column.dateTime()
  declare finalizedAt: DateTime

  @column()
  declare finalizedBy: string

  @belongsTo(() => VotingRound)
  declare votingRound: BelongsTo<typeof VotingRound>

  @belongsTo(() => User, { foreignKey: 'finalizedBy' })
  declare finalizer: BelongsTo<typeof User>

  // attach a uuid
  @beforeCreate()
  static assignUuid(result: RoundResult) {
    if (!result.id) {
      result.id = randomUUID()
    }
  }
}
