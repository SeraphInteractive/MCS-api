import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import VotingRound from '#models/voting_round'
import User from '#models/user'
import Entry from '#models/entry'

export default class Ballot extends BaseModel {
  static table = 'ballots'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare roundId: string

  @column()
  declare voterId: string

  @column()
  declare rank1EntryId: string

  @column()
  declare rank2EntryId: string

  @column()
  declare rank3EntryId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => VotingRound, { foreignKey: 'roundId' })
  declare votingRound: BelongsTo<typeof VotingRound>

  @belongsTo(() => User, { foreignKey: 'voterId' })
  declare voter: BelongsTo<typeof User>

  @belongsTo(() => Entry, { foreignKey: 'rank1EntryId' })
  declare rank1Entry: BelongsTo<typeof Entry>

  // we use node crypto for uuid
  @beforeCreate()
  static assignUuid(ballot: Ballot) {
    if (!ballot.id) {
      ballot.id = randomUUID()
    }
  }
}
