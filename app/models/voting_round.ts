import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Entry from '#models/entry'
import Ballot from '#models/ballot'

export default class VotingRound extends BaseModel {
  static table = 'voting_rounds'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare status: string

  @column.dateTime()
  declare opensAt: DateTime | null

  @column.dateTime()
  declare closesAt: DateTime | null

  @column()
  declare createdBy: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare creator: BelongsTo<typeof User>

  @hasMany(() => Entry, { foreignKey: 'roundId' })
  declare entries: HasMany<typeof Entry>

  @hasMany(() => Ballot, { foreignKey: 'roundId' })
  declare ballots: HasMany<typeof Ballot>

  // generate uuid
  @beforeCreate()
  static assignUuid(round: VotingRound) {
    if (!round.id) {
      round.id = randomUUID()
    }
  }
}
